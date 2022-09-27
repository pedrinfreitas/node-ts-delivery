import { Router } from 'express';

import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { CreateClienteController } from './modules/clients/useCases/createClient/CreateClientController';

const routes = Router();

const createClientController = new CreateClienteController();
const authenticateClientController = new AuthenticateClientController();

routes.post("/auth/", authenticateClientController.handle);
routes.post("/client/", createClientController.handle);

export { routes };
