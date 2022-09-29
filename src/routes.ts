import { Router } from 'express';

import { ensureAuthClient } from './middlewares/ensureAuthClient';
import { ensureAuthDeliveryman } from './middlewares/ensureAuthDeliveryman';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateClientController';
import { CreateClienteController } from './modules/clients/useCases/createClient/CreateClientController';
import { FindAllDeliveriesController } from './modules/clients/useCases/findAllDeliveries/findAllDeliveriesController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { UpdateEndDateController } from './modules/deliveries/useCases/updateEndDate/UpdateEndDateController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import {
  FindAllDeliveriesDeliverymanController,
} from './modules/deliveryman/useCases/findAllDeliveries/findAllDeliveriesDeliverymanController';
import { UpdateDeliverymanController } from './modules/deliveryman/useCases/updateDeliveryman/UpdateDeliverymanController';

const routes = Router();

//AUTH
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

routes.post("/auth/client", authenticateClientController.handle);
routes.post("/auth/deliveryman", authenticateDeliverymanController.handle);

//CLIENT
const createClientController = new CreateClienteController();
const findAllDeliveriesController = new FindAllDeliveriesController();

routes.post("/client/", createClientController.handle);
routes.get(
  "/client/deliveries",
  ensureAuthClient,
  findAllDeliveriesController.handle
);

//DELIVERYMAN
const createDeliverymanController = new CreateDeliverymanController();
const findAllDeliveriesDeliverymanController =
  new FindAllDeliveriesDeliverymanController();

routes.post("/deliveryman/", createDeliverymanController.handle);
routes.get(
  "/deliveryman/deliveries",
  ensureAuthDeliveryman,
  findAllDeliveriesDeliverymanController.handle
);

//DELIVERIES
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

routes.post("/delivery/", ensureAuthClient, createDeliveryController.handle);
routes.get("/delivery/available", findAllAvailableController.handle);
routes.put(
  "/delivery/updateDeliveryman/:id",
  ensureAuthDeliveryman,
  updateDeliverymanController.handle
);
routes.put(
  "/delivery/updateEndDate/:id",
  ensureAuthDeliveryman,
  updateEndDateController.handle
);

export { routes };
