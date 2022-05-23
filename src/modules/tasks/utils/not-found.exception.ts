import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'Type ID not Found', status || HttpStatus.BAD_REQUEST);
  }
}
