import { pool } from '../config/database';
import {
  ClinicaConfig,
  ClinicaConfigCreateInput,
  ClinicaConfigUpdateInput,
} from '../models/ClinicaConfig';

export class ClinicasConfigService {
  async findAll(clinicaId?: number): Promise<ClinicaConfig[]> {
    let query = 'SELECT * FROM directory.clinicas_config';
    const params: any[] = [];

    if (clinicaId) {
      query += ' WHERE clinica_id = $1';
      params.push(clinicaId);
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    return result.rows;
  }

  async findById(id: number): Promise<ClinicaConfig | null> {
    const result = await pool.query(
      'SELECT * FROM directory.clinicas_config WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async create(data: ClinicaConfigCreateInput): Promise<ClinicaConfig> {
    const result = await pool.query(
      `INSERT INTO directory.clinicas_config (clinica_id, endpoint_url, nombre_endpoint, descripcion, metodo_http, activo)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        data.clinica_id,
        data.endpoint_url,
        data.nombre_endpoint || null,
        data.descripcion || null,
        data.metodo_http || 'GET',
        data.activo !== undefined ? data.activo : true,
      ]
    );
    return result.rows[0];
  }

  async update(
    id: number,
    data: ClinicaConfigUpdateInput
  ): Promise<ClinicaConfig | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.endpoint_url !== undefined) {
      fields.push(`endpoint_url = $${paramCount++}`);
      values.push(data.endpoint_url);
    }
    if (data.nombre_endpoint !== undefined) {
      fields.push(`nombre_endpoint = $${paramCount++}`);
      values.push(data.nombre_endpoint);
    }
    if (data.descripcion !== undefined) {
      fields.push(`descripcion = $${paramCount++}`);
      values.push(data.descripcion);
    }
    if (data.metodo_http !== undefined) {
      fields.push(`metodo_http = $${paramCount++}`);
      values.push(data.metodo_http);
    }
    if (data.activo !== undefined) {
      fields.push(`activo = $${paramCount++}`);
      values.push(data.activo);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await pool.query(
      `UPDATE directory.clinicas_config SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM directory.clinicas_config WHERE id = $1',
      [id]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }
}

