import { Request, Response, NextFunction } from 'express';
import { ClinicasConfigService } from '../services/clinicas-config.service';
import { body, param, query, validationResult } from 'express-validator';

const clinicasConfigService = new ClinicasConfigService();

export const getClinicasConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const clinicaId = req.query.clinica_id
      ? parseInt(req.query.clinica_id as string, 10)
      : undefined;

    const configs = await clinicasConfigService.findAll(clinicaId);
    res.status(200).json({
      status: 'success',
      data: configs,
    });
  } catch (error) {
    next(error);
  }
};

export const getClinicaConfigById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const id = parseInt(req.params.id, 10);
    const config = await clinicasConfigService.findById(id);

    if (!config) {
      res.status(404).json({
        status: 'error',
        message: 'Clínica config not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: config,
    });
  } catch (error) {
    next(error);
  }
};

export const createClinicaConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const config = await clinicasConfigService.create(req.body);
    res.status(201).json({
      status: 'success',
      data: config,
    });
  } catch (error) {
    next(error);
  }
};

export const updateClinicaConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const id = parseInt(req.params.id, 10);
    const config = await clinicasConfigService.update(id, req.body);

    if (!config) {
      res.status(404).json({
        status: 'error',
        message: 'Clínica config not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: config,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteClinicaConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const id = parseInt(req.params.id, 10);
    const deleted = await clinicasConfigService.delete(id);

    if (!deleted) {
      res.status(404).json({
        status: 'error',
        message: 'Clínica config not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Clínica config deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Validation middleware
export const validateClinicaConfigId = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
];

export const validateCreateClinicaConfig = [
  body('clinica_id')
    .isInt({ min: 1 })
    .withMessage('clinica_id must be a positive integer'),
  body('endpoint_url')
    .trim()
    .notEmpty()
    .withMessage('endpoint_url is required')
    .isURL()
    .withMessage('endpoint_url must be a valid URL')
    .isLength({ max: 500 })
    .withMessage('endpoint_url must not exceed 500 characters'),
  body('nombre_endpoint')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('nombre_endpoint must not exceed 255 characters'),
  body('descripcion')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('descripcion must not exceed 1000 characters'),
  body('metodo_http')
    .optional()
    .trim()
    .isIn(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
    .withMessage('metodo_http must be one of: GET, POST, PUT, PATCH, DELETE'),
  body('activo')
    .optional()
    .isBoolean()
    .withMessage('activo must be a boolean'),
];

export const validateUpdateClinicaConfig = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  body('endpoint_url')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('endpoint_url cannot be empty')
    .isURL()
    .withMessage('endpoint_url must be a valid URL')
    .isLength({ max: 500 })
    .withMessage('endpoint_url must not exceed 500 characters'),
  body('nombre_endpoint')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('nombre_endpoint must not exceed 255 characters'),
  body('descripcion')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('descripcion must not exceed 1000 characters'),
  body('metodo_http')
    .optional()
    .trim()
    .isIn(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
    .withMessage('metodo_http must be one of: GET, POST, PUT, PATCH, DELETE'),
  body('activo')
    .optional()
    .isBoolean()
    .withMessage('activo must be a boolean'),
];

export const validateQueryClinicaId = [
  query('clinica_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('clinica_id must be a positive integer'),
];

