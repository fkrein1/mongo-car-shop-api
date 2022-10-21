export class AppError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export enum ErrorTypes {
  NotFound = 'Object not found',
  InvalidId = 'Id must have 24 hexadecimal characters',
  EmptyBody = 'Request body is empty',
}
