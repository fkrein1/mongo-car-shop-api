import { Router } from 'express';
import CarController from '../controllers/Car';

const carController = new CarController();

const route = Router();
const url = '/cars';

route.post(url, (req, res) => carController.create(req, res));
route.get(url, (req, res) => carController.read(req, res));
route.get(`${url}/:id`, (req, res) => carController.readOne(req, res));
route.put(`${url}/:id`, (req, res) => carController.update(req, res));
route.delete(`${url}/:id`, (req, res) => carController.delete(req, res));

export default route;
