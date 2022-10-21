import chai from 'chai';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
import CarModel from '../../../models/Car';
import MotorcycleModel from '../../../models/Motorcycle';
import { car, cars, newCar, updateCarBody, validCarId } from '../carMocks';
import { motorcycle, motorcycles, newMotorcycle, updatemotorcycleBody, validMotorcycleId } from '../motorcycleMocks';

const { expect } = chai;

const carModel = new CarModel();
const motorcycleModel = new MotorcycleModel();

describe('Model Layer', () => {
  describe('Car Model', () => {
    beforeEach(async () => {
      sinon.stub(Model, 'create').resolves(car);
      sinon.stub(Model, 'findOne').resolves(car);
      sinon.stub(Model, 'find').resolves(cars);
      sinon.stub(Model, 'findByIdAndDelete').resolves(car);
      sinon.stub(Model, 'findByIdAndUpdate').resolves(car);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Create', async () => {
      const result = await carModel.create(newCar);
      expect(result).to.be.deep.equal(car);
    });

    it('ReadOne', async () => {
      const result = await carModel.readOne(validCarId);
      expect(result).to.be.deep.equal(car);
    });

    it('Read', async () => {
      const result = await carModel.read();
      expect(result).to.be.deep.equal(cars);
    });

    it('Delete', async () => {
      const result = await carModel.delete(validCarId);
      expect(result).to.be.deep.equal(car);
    });

    it('Update', async () => {
      const result = await carModel.update(validCarId, updateCarBody);
      expect(result).to.be.deep.equal(car);
    });
  });

  describe('Motorcyle Model', () => {
    beforeEach(async () => {
      sinon.stub(Model, 'create').resolves(motorcycle);
      sinon.stub(Model, 'findOne').resolves(motorcycle);
      sinon.stub(Model, 'find').resolves(motorcycles);
      sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycle);
      sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycle);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Create', async () => {
      const result = await motorcycleModel.create(newMotorcycle);
      expect(result).to.be.deep.equal(motorcycle);
    });

    it('ReadOne', async () => {
      const result = await motorcycleModel.readOne(validMotorcycleId);
      expect(result).to.be.deep.equal(motorcycle);
    });

    it('Read', async () => {
      const result = await motorcycleModel.read();
      expect(result).to.be.deep.equal(motorcycles);
    });

    it('Delete', async () => {
      const result = await motorcycleModel.delete(validMotorcycleId);
      expect(result).to.be.deep.equal(motorcycle);
    });

    it('Update', async () => {
      const result = await motorcycleModel.update(validMotorcycleId, updatemotorcycleBody);
      expect(result).to.be.deep.equal(motorcycle);
    });
  });
});
