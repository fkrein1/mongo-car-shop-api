import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';
import MotorcycleService from '../services/Motorcycle';

class Motorcycle {
  constructor(private service: IService<IMotorcycle> = new MotorcycleService()) {}
  async create(req: Request, res: Response) {
    const result = await this.service.create(req.body);
    return res.status(201).json(result);
  }

  async read(_req: Request, res: Response) {
    const result = await this.service.read();
    return res.status(200).json(result);
  }

  async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.service.readOne(id);
    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.service.update(id, req.body);
    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.delete(id);
    return res.status(204).json({});
  }
}

export default Motorcycle;
