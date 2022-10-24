import { isValidObjectId } from 'mongoose';
import { AppError, ErrorTypes } from '../errors/error';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';
import MotorcycleModel from '../models/Motorcycle';

class Motorcycle implements IService<IMotorcycle> {
  constructor(private model: IModel<IMotorcycle> = new MotorcycleModel()) {}

  create(obj: unknown): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw new AppError(400, 'Invalid motorcycle schema');
    }
    return this.model.create(obj as IMotorcycle);
  }
  read(): Promise<IMotorcycle[]> {
    return this.model.read();
  }

  async readOne(_id: string): Promise<IMotorcycle> {
    if (!isValidObjectId(_id)) {
      throw new AppError(400, ErrorTypes.InvalidId);
    }
    const motorcycle = await this.model.readOne(_id);
    if (!motorcycle) throw new AppError(404, ErrorTypes.NotFound);

    return motorcycle;
  }

  async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    if (!obj || JSON.stringify(obj) === '{}') {
      throw new AppError(400, ErrorTypes.EmptyBody);
    }

    if (!isValidObjectId(_id)) {
      throw new AppError(400, ErrorTypes.InvalidId);
    }

    const motorcycle = await this.model.update(_id, obj as Partial<IMotorcycle>);
    if (!motorcycle) throw new AppError(404, ErrorTypes.NotFound);

    const editedmotorcycle = await this.model.readOne(_id);

    return editedmotorcycle as IMotorcycle;
  }

  async delete(_id: string): Promise<IMotorcycle> {
    if (!isValidObjectId(_id)) {
      throw new AppError(400, ErrorTypes.InvalidId);
    }

    const motorcycle = await this.model.delete(_id);
    if (!motorcycle) throw new AppError(404, ErrorTypes.NotFound);

    return motorcycle;
  }
}

export default Motorcycle;
