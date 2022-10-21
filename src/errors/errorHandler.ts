import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error.status) {
    return res.status(error.status).json({ error: error.message });
  }

  return res.status(500).json({ error: 'Server error' });
};

export default errorHandler;
