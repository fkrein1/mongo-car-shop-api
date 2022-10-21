import chai from 'chai';
import * as sinon from 'sinon';
const { expect } = chai;

import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';

import { AppError } from '../../../errors/error';
import {
  invalidmotorcycleId,
  motorcycle,
  motorcycles,
  newMotorcycle,
  newMotorcycleInvalid,
  validMotorcycleId,
  updatedMotorcycle,
  updatemotorcycleBody,
} from '../motorcycleMocks';

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);

describe('Motorcycle Service Layer', () => {
  afterEach(() => {
    sinon.restore();
  });
  
  describe('Create', () => {
    it('On Sucess', async () => {
      sinon.stub(motorcycleModel, 'create').resolves(motorcycle);
      const result = await motorcycleService.create(newMotorcycle);
      expect(result).to.be.deep.equal(motorcycle);
    });

    it('On failure of invalid schema', async () => {
      sinon.stub(motorcycleModel, 'create').resolves();
      let error;
      try {
        await motorcycleService.create(newMotorcycleInvalid);
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(400);
      expect(error).to.be.instanceOf(AppError);
    });
  });

  describe('ReadOne', () => {
    it('On Sucess', async () => {
      sinon.stub(motorcycleModel, 'readOne').resolves(motorcycle);
      const result = await motorcycleService.readOne(validMotorcycleId);
      expect(result).to.be.deep.equal(motorcycle);
    });

    it('On failure of invalid ID', async () => {
      sinon.stub(motorcycleModel, 'readOne').resolves();
      let error;
      try {
        await motorcycleService.readOne(invalidmotorcycleId);
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(400);
      expect(error).to.be.instanceOf(AppError);
      expect(error?.message).to.be.eq('Id must have 24 hexadecimal characters');
    });

    it('On failure of ID not found', async () => {
      sinon.stub(motorcycleModel, 'readOne').resolves(null);
      let error;
      try {
        await motorcycleService.readOne(validMotorcycleId);
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
      sinon.stub(motorcycleModel, 'read').resolves(motorcycles);
      const result = await motorcycleService.read();
      expect(result).to.be.deep.equal(motorcycles);
    });
  });

  describe('Delete', () => {
    it('On Sucess', async () => {
      sinon.stub(motorcycleModel, 'delete').resolves(motorcycle);
      const result = await motorcycleService.delete(validMotorcycleId);
      expect(result).to.be.deep.equal(motorcycle);
    });

    it('On failure of invalid ID', async () => {
      sinon.stub(motorcycleModel, 'delete').resolves();
      let error;
      try {
        await motorcycleService.delete(invalidmotorcycleId);
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(400);
      expect(error).to.be.instanceOf(AppError);
      expect(error?.message).to.be.eq('Id must have 24 hexadecimal characters');
    });

    it('On failure of ID not found', async () => {
      sinon.stub(motorcycleModel, 'delete').resolves(null);
      let error;
      try {
        await motorcycleService.delete(validMotorcycleId);
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
      sinon.stub(motorcycleModel, 'update').resolves(motorcycle);
      sinon.stub(motorcycleModel, 'readOne').resolves(updatedMotorcycle);
      const result = await motorcycleService.update(validMotorcycleId, updatemotorcycleBody);
      expect(result).to.be.deep.equal(updatedMotorcycle);
    });

    it('On failure of invalid ID', async () => {
      sinon.stub(motorcycleModel, 'update').resolves();
      sinon.stub(motorcycleModel, 'readOne').resolves();
      let error;
      try {
        await motorcycleService.update(invalidmotorcycleId, updatemotorcycleBody);
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(400);
      expect(error).to.be.instanceOf(AppError);
      expect(error?.message).to.be.eq('Id must have 24 hexadecimal characters');
    });

    it('On failure of ID not found', async () => {
      sinon.stub(motorcycleModel, 'update').resolves(null);
      sinon.stub(motorcycleModel, 'readOne').resolves();
      let error;
      try {
        await motorcycleService.update(validMotorcycleId, updatemotorcycleBody);
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(404);
      expect(error).to.be.instanceOf(AppError);
      expect(error?.message).to.be.eq('Object not found');
    });

    it('On failure of empty request body', async () => {
      sinon.stub(motorcycleModel, 'update').resolves();
      sinon.stub(motorcycleModel, 'readOne').resolves();
      let error;
      try {
        await motorcycleService.update(validMotorcycleId, {});
      } catch (err) {
        error = err as AppError;
      }
      expect(error?.status).to.be.eq(400);
      expect(error).to.be.instanceOf(AppError);
      expect(error?.message).to.be.eq('Request body is empty');
    });
  });
});
