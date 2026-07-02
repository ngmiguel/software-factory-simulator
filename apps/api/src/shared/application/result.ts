export class Result<T, E = Error> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  private readonly _value?: T;
  private readonly _error?: E;

  private constructor(isSuccess: boolean, value?: T, error?: E) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this._value = value;
    this._error = error;
  }

  getValue(): T {
    if (!this.isSuccess) {
      throw new Error('Cannot get value from failed result');
    }
    return this._value as T;
  }

  getError(): E {
    if (!this.isFailure) {
      throw new Error('Cannot get error from successful result');
    }
    return this._error as E;
  }

  static ok<T>(value: T): Result<T> {
    return new Result<T>(true, value);
  }

  static fail<E = Error>(error: E): Result<never, E> {
    return new Result<never, E>(false, undefined, error);
  }
}
