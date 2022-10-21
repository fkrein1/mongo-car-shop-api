import express from 'express';
import 'express-async-errors';
import errorHandler from './errors/errorHandler';
import carRoute from './routes/car.route';
import motorcycleRoute from './routes/motorcycle.route';

const app = express();
app.use(express.json());
app.use(carRoute);
app.use(motorcycleRoute);
app.use(errorHandler);

export default app;
