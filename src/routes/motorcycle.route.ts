import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle';

const motorcycleController = new MotorcycleController();

const route = Router();
const url = '/motorcycles';

route.post(url, (req, res) => motorcycleController.create(req, res));
route.get(url, (req, res) => motorcycleController.read(req, res));
route.get(`${url}/:id`, (req, res) => motorcycleController.readOne(req, res));
route.put(`${url}/:id`, (req, res) => motorcycleController.update(req, res));
route.delete(`${url}/:id`, (req, res) => motorcycleController.delete(req, res));

export default route;
