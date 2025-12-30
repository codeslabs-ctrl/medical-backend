import { Router } from 'express';
import { proxyCapability } from '../controllers/proxy.controller';

export const proxyRouter = Router();

/**
 * Proxy genérico por capability:
 * - GET  /api/proxy/:clinicaAlias/:capabilityKey
 * - POST /api/proxy/:clinicaAlias/:capabilityKey
 *
 * El método debe coincidir con lo configurado en directory.clinicas_config.metodo_http
 */
proxyRouter.all('/:clinicaAlias/:capabilityKey', proxyCapability);


