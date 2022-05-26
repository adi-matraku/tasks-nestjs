import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'Email already exists.', status || HttpStatus.BAD_REQUEST);
  }
}
