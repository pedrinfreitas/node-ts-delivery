import { Router } from 'express';

import { ensureAuthClient } from './middlewares/ensureAuthClient';
import { ensureAuthDeliveryman } from './middlewares/ensureAuthDeliveryman';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateClientController';
import { CreateClienteController } from './modules/clients/useCases/createClient/CreateClientController';
import { FindAllDeliveriesController } from './modules/clients/useCases/findAllDeliveries/findAllDeliveriesController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { FindAllAvailableController } from './modules/deliveryman/useCases/findAllAvailable/FindAllAvailableController';
import { UpdateDeliverymanController } from './modules/deliveryman/useCases/updateDeliveryman/UpdateDeliverymanController';

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const createClientController = new CreateClienteController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();

const updateDeliverymanController = new UpdateDeliverymanController();

routes.post("/auth/client", authenticateClientController.handle);
routes.post("/auth/deliveryman", authenticateDeliverymanController.handle);

routes.post("/client/", createClientController.handle);
routes.get(
  "/client/deliveries",
  ensureAuthClient,
  findAllDeliveriesController.handle
);

routes.post("/deliveryman/", createDeliverymanController.handle);

routes.post("/delivery/", ensureAuthClient, createDeliveryController.handle);
routes.get("/delivery/available", findAllAvailableController.handle);
routes.put(
  "/delivery/updateDeliveryman/:id",
  ensureAuthDeliveryman,
  updateDeliverymanController.handle
);

export { routes };
