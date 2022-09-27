import { Router } from 'express';

import { CreateClienteController } from './modules/clients/useCases/createClient/CreateClientController';

const routes = Router();

const createClientController = new CreateClienteController();

routes.post("/client/", createClientController.handle);

export { routes };
