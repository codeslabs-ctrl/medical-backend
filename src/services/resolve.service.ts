import { pool } from '../config/database';

export interface ResolveClinicTarget {
  clinica_id: number;
  clinica_alias: string;
  nombre_clinica: string;
  api_base_url: string;
  endpoint_path: string;
  metodo_http: string;
}

export class ResolveService {
  async getClinicsWithCapability(capabilityKey: string): Promise<ResolveClinicTarget[]> {
    const result = await pool.query(
      `SELECT
         c.id as clinica_id,
         c.clinica_alias,
         c.nombre_clinica,
         c.api_base_url,
         cc.endpoint_path,
         cc.metodo_http
       FROM directory.clinicas c
       JOIN directory.clinicas_config cc ON cc.clinica_id = c.id
       WHERE c.activo = true
         AND cc.activo = true
         AND cc.capability_key = $1
         AND c.api_base_url IS NOT NULL
         AND cc.endpoint_path IS NOT NULL
         AND cc.metodo_http IS NOT NULL
       ORDER BY c.id ASC`,
      [capabilityKey]
    );
    return result.rows;
  }
}


