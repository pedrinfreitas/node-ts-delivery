import { Router } from 'express';

import { ensureAuthClient } from './middlewares/ensureAuthClient';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateClientController';
import { CreateClienteController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const createClientController = new CreateClienteController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();

routes.post("/auth/client", authenticateClientController.handle);
routes.post("/auth/deliveryman", authenticateDeliverymanController.handle);
routes.post("/client/", createClientController.handle);
routes.post("/deliveryman/", createDeliverymanController.handle);
routes.post("/delivery/", ensureAuthClient, createDeliveryController.handle);

export { routes };
