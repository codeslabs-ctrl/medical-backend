import { Router } from 'express';
import { resolvePatientByCedula } from '../controllers/resolve.controller';

export const resolveRouter = Router();

// POST /api/resolve/patient
resolveRouter.post('/patient', resolvePatientByCedula);


