import { HttpStatus, Res } from '@nestjs/common';

export class AppResponse {
  static ok(@Res() Res, values: any, message = '', statusCode = 200) {
    return Res.status(statusCode).json({
      status: 'success',
      message,
      data: {
        ...values,
      },
    });
  }

  static badRequest(@Res() Res, message, statusCode = 400) {
    let status = 'fail';
    if (statusCode.toLocaleString().charAt(0) === '5') {
      status = 'error';
    }
    return Res.status(statusCode).json({
      status,
      message,
    });
  }
}
