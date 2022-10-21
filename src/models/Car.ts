import { model as mongooseModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carMongooseSchema = new Schema<ICar>(
  {
    doorsQty: Number,
    seatsQty: Number,
    model: String,
    year: Number,
    color: String,
    status: Boolean,
    buyValue: Number,
  },
  { versionKey: false },
);

class Car extends MongoModel<ICar> {
  constructor(model = mongooseModel('Car', carMongooseSchema)) {
    super(model);
  }
}

export default Car;
