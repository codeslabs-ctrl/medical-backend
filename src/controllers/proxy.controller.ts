import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { ProxyService } from '../services/proxy.service';

const proxyService = new ProxyService();

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<globalThis.Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

function joinUrl(base: string, path: string): string {
  const normalizedBase = base.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function isAllowedExternalPath(path: string): boolean {
  // Hard safety: solo permitimos llamar al External API ya versionado.
  return path.startsWith('/api/v1/external/v1/');
}

function getUpstreamApiKey(capabilityKey: string, _authType: string | null): string | null {
  // Decisión de negocio (por ahora):
  // - broadcast_* => usa key N8N (automatización)
  // - todo lo demás => usa key de pacientes (incluye patient_lookup_post aunque esté marcado como server_api_key)
  // Esto respeta tu regla: "lookup usa la misma key".
  if (capabilityKey.startsWith('broadcast_')) {
    return process.env.UPSTREAM_N8N_API_KEY || null;
  }
  return process.env.UPSTREAM_PATIENT_APP_API_KEY || null;
}

export const proxyCapability = async (req: Request, res: ExpressResponse, next: NextFunction): Promise<void> => {
  try {
    const clinicaAlias = String(req.params['clinicaAlias'] || '').trim();
    const capabilityKey = String(req.params['capabilityKey'] || '').trim();

    if (!clinicaAlias || !capabilityKey) {
      res.status(400).json({ status: 'error', message: 'clinicaAlias y capabilityKey son requeridos' });
      return;
    }

    const clinica = await proxyService.getClinicaByAlias(clinicaAlias);
    if (!clinica || clinica.activo === false) {
      res.status(404).json({ status: 'error', message: 'Clínica no encontrada o inactiva' });
      return;
    }
    if (!clinica.api_base_url) {
      res.status(400).json({ status: 'error', message: 'api_base_url no configurado para la clínica' });
      return;
    }

    const cfg = await proxyService.getCapabilityConfig(clinica.id, capabilityKey);
    if (!cfg || cfg.activo === false) {
      res.status(404).json({ status: 'error', message: 'Capability no encontrada o inactiva' });
      return;
    }

    const method = (cfg.metodo_http || '').toUpperCase();
    const endpointPath = cfg.endpoint_path || '';
    if (!method || !endpointPath) {
      res.status(400).json({ status: 'error', message: 'Capability sin método o endpoint_path configurado' });
      return;
    }

    if (method !== req.method.toUpperCase()) {
      res.status(405).json({ status: 'error', message: `Método no permitido. Esperado ${method}` });
      return;
    }

    if (!isAllowedExternalPath(endpointPath)) {
      res.status(400).json({ status: 'error', message: 'endpoint_path no permitido (política de seguridad)' });
      return;
    }

    const upstreamUrl = new URL(joinUrl(clinica.api_base_url, endpointPath));

    // Reenviar querystring del request original
    for (const [k, v] of Object.entries(req.query || {})) {
      if (v === undefined || v === null) continue;
      upstreamUrl.searchParams.set(k, Array.isArray(v) ? String(v[0]) : String(v));
    }

    const apiKey = getUpstreamApiKey(capabilityKey, cfg.auth_type);
    if (!apiKey) {
      res.status(503).json({ status: 'error', message: 'No hay API key upstream configurada en MediAsistencia (.env)' });
      return;
    }

    const headers: Record<string, string> = {
      'X-API-Key': apiKey,
      'Accept': 'application/json'
    };

    const hasBody = req.method.toUpperCase() !== 'GET' && req.method.toUpperCase() !== 'HEAD';
    if (hasBody) {
      headers['Content-Type'] = 'application/json';
    }

    let upstreamResp: globalThis.Response;
    try {
      upstreamResp = await fetchWithTimeout(
        upstreamUrl.toString(),
        {
          method,
          headers,
          body: hasBody ? JSON.stringify(req.body ?? {}) : undefined
        },
        Number(process.env['PROXY_UPSTREAM_TIMEOUT_MS'] || 15000)
      );
    } catch (err: any) {
      const cause = err?.cause;
      res.status(502).json({
        status: 'error',
        message: 'fetch failed',
        details: {
          upstreamUrl: upstreamUrl.toString(),
          name: err?.name,
          message: err?.message,
          cause: cause
            ? {
                code: cause?.code,
                errno: cause?.errno,
                syscall: cause?.syscall,
                address: cause?.address,
                port: cause?.port
              }
            : null
        }
      });
      return;
    }

    const contentType = upstreamResp.headers.get('content-type') || 'application/json; charset=utf-8';
    const contentDisposition = upstreamResp.headers.get('content-disposition');

    res.status(upstreamResp.status);
    res.setHeader('Content-Type', contentType);
    if (contentDisposition) {
      res.setHeader('Content-Disposition', contentDisposition);
    }

    // Si viene binario (PDF u otros), reenviar como buffer
    if (/application\/pdf/i.test(contentType) || /^image\//i.test(contentType) || /octet-stream/i.test(contentType)) {
      const buf = Buffer.from(await upstreamResp.arrayBuffer());
      res.send(buf);
      return;
    }

    const text = await upstreamResp.text();
    res.send(text);
  } catch (error) {
    next(error);
  }
};


