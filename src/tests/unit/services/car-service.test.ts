import chai from 'chai';
import * as sinon from 'sinon';
const { expect } = chai;

import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';

import { AppError } from '../../../errors/error';
import {
  car,
  cars,
  invalidCarId,
  newCar,
  newCarInvalid,
  updateCarRequest,
  updatedCar,
  validCarId,
} from '../carMocks';

const carModel = new CarModel();
const carService = new CarService(carModel);

describe('Car Service Layer', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('Create', () => {
    it('On Sucess', async () => {
      sinon.stub(carModel, 'create').resolves(car);
      const result = await carService.create(newCar);
      expect(result).to.be.deep.equal(car);
    });

    it('On failure of invalid schema', async () => {
      sinon.stub(carModel, 'create').resolves();
      let error;
      try {
        await carService.create(newCarInvalid);
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(400);
      expect(error).to.be.instanceOf(AppError);
    });
  });

  describe('ReadOne', () => {
    it('On Sucess', async () => {
      sinon.stub(carModel, 'readOne').resolves(car);
      const result = await carService.readOne(validCarId);
      expect(result).to.be.deep.equal(car);
    });

    it('On failure of invalid ID', async () => {
      sinon.stub(carModel, 'readOne').resolves();
      let error;
      try {
        await carService.readOne(invalidCarId);
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(400);
      expect(error).to.be.instanceOf(AppError);
      expect(error?.message).to.be.eq('Id must have 24 hexadecimal characters');
    });

    it('On failure of ID not found', async () => {
      sinon.stub(carModel, 'readOne').resolves(null);
      let error;
      try {
        await carService.readOne(validCarId);
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(404);
      expect(error).to.be.instanceOf(AppError);
      expect(error?.message).to.be.eq('Object not found');
    });
  });

  describe('Read', () => {
    it('On Sucess', async () => {
      sinon.stub(carModel, 'read').resolves(cars);
      const result = await carService.read();
      expect(result).to.be.deep.equal(cars);
    });
  });

  describe('Delete', () => {
    it('On Sucess', async () => {
      sinon.stub(carModel, 'delete').resolves(car);
      const result = await carService.delete(validCarId);
      expect(result).to.be.deep.equal(car);
    });

    it('On failure of invalid ID', async () => {
      sinon.stub(carModel, 'delete').resolves();
      let error;
      try {
        await carService.delete(invalidCarId);
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(400);
      expect(error).to.be.instanceOf(AppError);
      expect(error?.message).to.be.eq('Id must have 24 hexadecimal characters');
    });

    it('On failure of ID not found', async () => {
      sinon.stub(carModel, 'delete').resolves(null);
      let error;
      try {
        await carService.delete(validCarId);
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(404);
      expect(error).to.be.instanceOf(AppError);
      expect(error?.message).to.be.eq('Object not found');
    });
  });

  describe('Update', () => {
    it('On Sucess', async () => {
      sinon.stub(carModel, 'update').resolves(car);
      sinon.stub(carModel, 'readOne').resolves(updatedCar);
      const result = await carService.update(validCarId, updateCarRequest);
      expect(result).to.be.deep.equal(updatedCar);
    });

    it('On failure of invalid ID', async () => {
      sinon.stub(carModel, 'update').resolves();
      sinon.stub(carModel, 'readOne').resolves();
      let error;
      try {
        await carService.update(invalidCarId, updateCarRequest);
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(400);
      expect(error).to.be.instanceOf(AppError);
      expect(error?.message).to.be.eq('Id must have 24 hexadecimal characters');
    });

    it('On failure of ID not found', async () => {
      sinon.stub(carModel, 'update').resolves(null);
      sinon.stub(carModel, 'readOne').resolves();
      let error;
      try {
        await carService.update(validCarId, updateCarRequest);
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(404);
      expect(error).to.be.instanceOf(AppError);
      expect(error?.message).to.be.eq('Object not found');
    });

    it('On failure of empty request body', async () => {
      sinon.stub(carModel, 'update').resolves();
      sinon.stub(carModel, 'readOne').resolves();
      let error;
      try {
        await carService.update(validCarId, {});
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(400);
      expect(error).to.be.instanceOf(AppError);
      expect(error?.message).to.be.eq('Request body is empty');
    });
  });
});
