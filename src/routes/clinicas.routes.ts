import { Router } from 'express';
import {
  getClinicas,
  getClinicaById,
  createClinica,
  updateClinica,
  deleteClinica,
  validateClinicaId,
  validateCreateClinica,
  validateUpdateClinica,
} from '../controllers/clinicas.controller';

export const clinicasRouter = Router();

clinicasRouter.get('/', getClinicas);
clinicasRouter.get('/:id', validateClinicaId, getClinicaById);
clinicasRouter.post('/', validateCreateClinica, createClinica);
clinicasRouter.put('/:id', validateUpdateClinica, updateClinica);
clinicasRouter.delete('/:id', validateClinicaId, deleteClinica);

