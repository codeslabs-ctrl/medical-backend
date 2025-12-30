import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { ResolveService } from '../services/resolve.service';

const resolveService = new ResolveService();

function normalizeCedula(raw: unknown): string {
  return String(raw ?? '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
}

function joinUrl(base: string, path: string): string {
  const b = base.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}

function isAllowedExternalPath(path: string): boolean {
  return path.startsWith('/api/v1/external/v1/');
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<globalThis.Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

export const resolvePatientByCedula = async (req: Request, res: ExpressResponse, next: NextFunction): Promise<void> => {
  try {
    const cedula = normalizeCedula((req.body as any)?.cedula);
    if (!/^[VP][0-9]{7,10}$/.test(cedula)) {
      res.status(400).json({ status: 'error', message: 'Cédula inválida. Formato esperado: V o P + 7-10 dígitos (se permiten guiones/puntos).' });
      return;
    }

    const targets = await resolveService.getClinicsWithCapability('patient_lookup_post');
    if (targets.length === 0) {
      res.status(503).json({ status: 'error', message: 'No hay clínicas configuradas con patient_lookup_post' });
      return;
    }

    const upstreamKey = process.env.UPSTREAM_PATIENT_APP_API_KEY;
    if (!upstreamKey) {
      res.status(503).json({ status: 'error', message: 'UPSTREAM_PATIENT_APP_API_KEY no configurada en .env' });
      return;
    }

    const results = await Promise.all(
      targets.map(async (t) => {
        const method = String(t.metodo_http || '').toUpperCase();
        const endpointPath = String(t.endpoint_path || '');

        if (method !== 'POST') {
          return { clinica_alias: t.clinica_alias, nombre_clinica: t.nombre_clinica, error: 'metodo_no_soportado' as const };
        }
        if (!isAllowedExternalPath(endpointPath)) {
          return { clinica_alias: t.clinica_alias, nombre_clinica: t.nombre_clinica, error: 'endpoint_no_permitido' as const };
        }

        const url = joinUrl(t.api_base_url, endpointPath);
        const upstreamResp = await fetchWithTimeout(
          url,
          {
            method: 'POST',
            headers: {
              'X-API-Key': upstreamKey,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ cedula })
          },
          7000
        );

        const json: any = await upstreamResp.json().catch(() => null);
        if (!upstreamResp.ok) {
          return { clinica_alias: t.clinica_alias, nombre_clinica: t.nombre_clinica, status: upstreamResp.status, error: json || { message: 'upstream_error' } };
        }

        const exists = Boolean(json?.data?.exists);
        if (!exists) return null;

        return {
          clinica_alias: t.clinica_alias,
          nombre_clinica: t.nombre_clinica,
          data: json.data
        };
      })
    );

    const matches = results.filter(r => r !== null);
    res.json({
      status: 'success',
      data: {
        cedula,
        matches
      }
    });
  } catch (error) {
    next(error);
  }
};


