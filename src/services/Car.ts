import { isValidObjectId } from 'mongoose';
import { AppError, ErrorTypes } from '../errors/error';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import CarModel from '../models/Car';

class Car implements IService<ICar> {
  constructor(private model: IModel<ICar> = new CarModel()) {}

  create(obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw new AppError(400, 'Invalid car schema');
    }
    return this.model.create(obj as ICar);
  }
  read(): Promise<ICar[]> {
    return this.model.read();
  }

  async readOne(_id: string): Promise<ICar> {
    if (!isValidObjectId(_id)) {
      throw new AppError(400, ErrorTypes.InvalidId);
    }
    const car = await this.model.readOne(_id);
    if (!car) throw new AppError(404, ErrorTypes.NotFound);

    return car;
  }

  async update(_id: string, obj: unknown): Promise<ICar> {
    if (!obj || JSON.stringify(obj) === '{}') {
      throw new AppError(400, ErrorTypes.EmptyBody);
    }

    if (!isValidObjectId(_id)) {
      throw new AppError(400, ErrorTypes.InvalidId);
    }

    const car = await this.model.update(_id, obj as Partial<ICar>);
    if (!car) throw new AppError(404, ErrorTypes.NotFound);

    const editedCar = await this.model.readOne(_id);

    return editedCar as ICar;
  }

  async delete(_id: string): Promise<ICar> {
    if (!isValidObjectId(_id)) {
      throw new AppError(400, ErrorTypes.InvalidId);
    }

    const car = await this.model.delete(_id);
    if (!car) throw new AppError(404, ErrorTypes.NotFound);

    return car;
  }
}

export default Car;
