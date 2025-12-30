export interface ClinicaConfig {
  id?: number;
  clinica_id: number;
  endpoint_url: string;
  nombre_endpoint?: string;
  descripcion?: string;
  metodo_http?: string;
  activo?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface ClinicaConfigCreateInput {
  clinica_id: number;
  endpoint_url: string;
  nombre_endpoint?: string;
  descripcion?: string;
  metodo_http?: string;
  activo?: boolean;
}

export interface ClinicaConfigUpdateInput {
  endpoint_url?: string;
  nombre_endpoint?: string;
  descripcion?: string;
  metodo_http?: string;
  activo?: boolean;
}

