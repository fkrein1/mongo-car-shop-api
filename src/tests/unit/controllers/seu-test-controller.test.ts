import chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
const { expect } = chai;

import CarController from '../../../controllers/Car';
import MotorcycleController from '../../../controllers/Motorcycle';
import CarService from '../../../services/Car';
import MotorcycleService from '../../../services/Motorcycle';

import { car, cars, newCar, updateCarRequest, validCarId } from '../carMocks';
import { motorcycle, motorcycles, newMotorcycle, updatemotorcycleBody, validMotorcycleId } from '../motorcycleMocks';


const carService = new CarService();
const motorcycleService = new MotorcycleService();
const carController = new CarController(carService);
const motorcycleController = new MotorcycleController(motorcycleService);

const req = {} as Request;
const res = {} as Response;

describe('Controller Layer', () => {
  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Car Controller', () => {
    it('create', async () => {
      sinon.stub(carService, 'create').resolves(car);

      req.body = newCar;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(car)).to.be.true;
    });

    it('read', async () => {
      sinon.stub(carService, 'read').resolves(cars);

      await carController.read(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(cars)).to.be.true;
    });

    it('readOne', async () => {
      sinon.stub(carService, 'readOne').resolves(car);

      req.params = { id: validCarId };

      await carController.readOne(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(car)).to.be.true;
    });

    it('update', async () => {
      sinon.stub(carService, 'update').resolves(car);

      req.params = { id: validCarId };
      req.body = updateCarRequest;

      await carController.update(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(car)).to.be.true;
    });

    it('delete', async () => {
      sinon.stub(carService, 'delete').resolves();

      req.params = { id: validCarId };

      await carController.delete(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(204)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith({})).to.be.true;
    });
  });

  describe('Motorcycle Controller', () => {
    it('create', async () => {
      sinon.stub(motorcycleService, 'create').resolves(motorcycle);

      req.body = newMotorcycle;
      await motorcycleController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(motorcycle)).to.be.true;
    });

    it('read', async () => {
      sinon.stub(motorcycleService, 'read').resolves(motorcycles);

      await motorcycleController.read(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(motorcycles)).to.be.true;
    });

    it('readOne', async () => {
      sinon.stub(motorcycleService, 'readOne').resolves(motorcycle);

      req.params = { id: validMotorcycleId };

      await motorcycleController.readOne(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(motorcycle)).to.be.true;
    });

    it('update', async () => {
      sinon.stub(motorcycleService, 'update').resolves(motorcycle);

      req.params = { id: validMotorcycleId };
      req.body = updatemotorcycleBody;

      await motorcycleController.update(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(motorcycle)).to.be.true;
    });

    it('delete', async () => {
      sinon.stub(motorcycleService, 'delete').resolves();

      req.params = { id: validMotorcycleId };

      await motorcycleController.delete(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(204)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith({})).to.be.true;
    });
  });
});
