import { pool } from '../config/database';
import { Clinica, ClinicaCreateInput, ClinicaUpdateInput } from '../models/Clinica';

export class ClinicasService {
  async findAll(): Promise<Clinica[]> {
    const result = await pool.query(
      'SELECT * FROM directory.clinicas ORDER BY created_at DESC'
    );
    return result.rows;
  }

  async findById(id: number): Promise<Clinica | null> {
    const result = await pool.query(
      'SELECT * FROM directory.clinicas WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async create(data: ClinicaCreateInput): Promise<Clinica> {
    const result = await pool.query(
      `INSERT INTO directory.clinicas (nombre_clinica, clinica_alias, direccion, telefono, email, activo)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        data.nombre_clinica,
        data.clinica_alias,
        data.direccion || null,
        data.telefono || null,
        data.email || null,
        data.activo !== undefined ? data.activo : true,
      ]
    );
    return result.rows[0];
  }

  async update(id: number, data: ClinicaUpdateInput): Promise<Clinica | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.nombre_clinica !== undefined) {
      fields.push(`nombre_clinica = $${paramCount++}`);
      values.push(data.nombre_clinica);
    }
    if (data.clinica_alias !== undefined) {
      fields.push(`clinica_alias = $${paramCount++}`);
      values.push(data.clinica_alias);
    }
    if (data.direccion !== undefined) {
      fields.push(`direccion = $${paramCount++}`);
      values.push(data.direccion);
    }
    if (data.telefono !== undefined) {
      fields.push(`telefono = $${paramCount++}`);
      values.push(data.telefono);
    }
    if (data.email !== undefined) {
      fields.push(`email = $${paramCount++}`);
      values.push(data.email);
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
      `UPDATE directory.clinicas SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM directory.clinicas WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}

