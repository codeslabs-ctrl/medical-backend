import { Request, Response, NextFunction } from 'express';
import { ClinicasService } from '../services/clinicas.service';
import { body, param, validationResult } from 'express-validator';

const clinicasService = new ClinicasService();

export const getClinicas = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const clinicas = await clinicasService.findAll();
    res.status(200).json({
      status: 'success',
      data: clinicas,
    });
  } catch (error) {
    next(error);
  }
};

export const getClinicaById = async (
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
    const clinica = await clinicasService.findById(id);

    if (!clinica) {
      res.status(404).json({
        status: 'error',
        message: 'Clínica not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: clinica,
    });
  } catch (error) {
    next(error);
  }
};

export const createClinica = async (
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

    const clinica = await clinicasService.create(req.body);
    res.status(201).json({
      status: 'success',
      data: clinica,
    });
  } catch (error) {
    next(error);
  }
};

export const updateClinica = async (
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
    const clinica = await clinicasService.update(id, req.body);

    if (!clinica) {
      res.status(404).json({
        status: 'error',
        message: 'Clínica not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: clinica,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteClinica = async (
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
    const deleted = await clinicasService.delete(id);

    if (!deleted) {
      res.status(404).json({
        status: 'error',
        message: 'Clínica not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Clínica deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Validation middleware
export const validateClinicaId = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
];

export const validateCreateClinica = [
  body('nombre_clinica')
    .trim()
    .notEmpty()
    .withMessage('nombre_clinica is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('nombre_clinica must be between 1 and 255 characters'),
  body('clinica_alias')
    .trim()
    .notEmpty()
    .withMessage('clinica_alias is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('clinica_alias must be between 1 and 100 characters'),
  body('direccion')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('direccion must not exceed 500 characters'),
  body('telefono')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('telefono must not exceed 20 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('email must be a valid email address'),
  body('activo')
    .optional()
    .isBoolean()
    .withMessage('activo must be a boolean'),
];

export const validateUpdateClinica = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  body('nombre_clinica')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('nombre_clinica cannot be empty')
    .isLength({ min: 1, max: 255 })
    .withMessage('nombre_clinica must be between 1 and 255 characters'),
  body('clinica_alias')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('clinica_alias cannot be empty')
    .isLength({ min: 1, max: 100 })
    .withMessage('clinica_alias must be between 1 and 100 characters'),
  body('direccion')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('direccion must not exceed 500 characters'),
  body('telefono')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('telefono must not exceed 20 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('email must be a valid email address'),
  body('activo')
    .optional()
    .isBoolean()
    .withMessage('activo must be a boolean'),
];

