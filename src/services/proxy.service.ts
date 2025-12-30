import { pool } from '../config/database';

export interface ClinicaRow {
  id: number;
  clinica_alias: string;
  api_base_url: string | null;
  activo: boolean | null;
}

export interface ClinicaConfigRow {
  id: number;
  clinica_id: number;
  capability_key: string | null;
  metodo_http: string | null;
  endpoint_path: string | null;
  auth_type: string | null;
  activo: boolean | null;
}

export class ProxyService {
  async getClinicaByAlias(alias: string): Promise<ClinicaRow | null> {
    const result = await pool.query(
      `SELECT id, clinica_alias, api_base_url, activo
       FROM directory.clinicas
       WHERE clinica_alias = $1
       LIMIT 1`,
      [alias]
    );
    return result.rows[0] || null;
  }

  async getCapabilityConfig(clinicaId: number, capabilityKey: string): Promise<ClinicaConfigRow | null> {
    const result = await pool.query(
      `SELECT id, clinica_id, capability_key, metodo_http, endpoint_path, auth_type, activo
       FROM directory.clinicas_config
       WHERE clinica_id = $1 AND capability_key = $2
       LIMIT 1`,
      [clinicaId, capabilityKey]
    );
    return result.rows[0] || null;
  }
}


