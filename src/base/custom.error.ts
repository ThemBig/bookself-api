export class CustomError {
  message: string;
  HttpCode: number;
  constructor(message, HttpCode = 400) {
    this.message = message;
    this.HttpCode = HttpCode;
  }
}
