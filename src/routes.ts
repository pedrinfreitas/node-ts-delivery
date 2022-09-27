import { Router } from 'express';

import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { CreateClienteController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const createClientController = new CreateClienteController();
const createDeliverymanController = new CreateDeliverymanController();

routes.post("/auth/", authenticateClientController.handle);
routes.post("/client/", createClientController.handle);
routes.post("/deliveryman/", createDeliverymanController.handle);

export { routes };
