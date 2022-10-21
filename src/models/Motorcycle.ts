import { model as mongooseModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleMongooseSchema = new Schema<IMotorcycle>(
  {
    model: String,
    year: Number,
    color: String,
    status: Boolean,
    buyValue: Number,
    category: String,
    engineCapacity: Number,
  },
  { versionKey: false },
);

class Motorcycle extends MongoModel<IMotorcycle> {
  constructor(model = mongooseModel('Motorcycle', motorcycleMongooseSchema)) {
    super(model);
  }
}

export default Motorcycle;
