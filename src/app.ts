import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import errorHandler from './errors/errorHandler';
import carRoute from './routes/car.route';
import motorcycleRoute from './routes/motorcycle.route';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerFile = require('./swagger.json');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(carRoute);
app.use(motorcycleRoute);
app.use(errorHandler);

export default app;
