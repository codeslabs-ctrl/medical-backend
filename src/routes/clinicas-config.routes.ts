import { Router } from 'express';
import {
  getClinicasConfig,
  getClinicaConfigById,
  createClinicaConfig,
  updateClinicaConfig,
  deleteClinicaConfig,
  validateClinicaConfigId,
  validateCreateClinicaConfig,
  validateUpdateClinicaConfig,
  validateQueryClinicaId,
} from '../controllers/clinicas-config.controller';

export const clinicasConfigRouter = Router();

clinicasConfigRouter.get(
  '/',
  validateQueryClinicaId,
  getClinicasConfig
);
clinicasConfigRouter.get(
  '/:id',
  validateClinicaConfigId,
  getClinicaConfigById
);
clinicasConfigRouter.post(
  '/',
  validateCreateClinicaConfig,
  createClinicaConfig
);
clinicasConfigRouter.put(
  '/:id',
  validateUpdateClinicaConfig,
  updateClinicaConfig
);
clinicasConfigRouter.delete(
  '/:id',
  validateClinicaConfigId,
  deleteClinicaConfig
);

