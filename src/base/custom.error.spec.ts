import { CustomError } from './custom.error';

describe('CustomError', () => {
  it('should be defined', () => {
    expect(new CustomError()).toBeDefined();
  });
});
