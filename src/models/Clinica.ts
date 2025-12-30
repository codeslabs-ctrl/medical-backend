export interface Clinica {
  id?: number;
  nombre_clinica: string;
  clinica_alias: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  activo?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface ClinicaCreateInput {
  nombre_clinica: string;
  clinica_alias: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  activo?: boolean;
}

export interface ClinicaUpdateInput {
  nombre_clinica?: string;
  clinica_alias?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  activo?: boolean;
}

