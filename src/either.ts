import { Fn } from "./common";

export interface Either<L, R> {
  map<U>(mapper: Fn<R, U>): Either<L, U>;
  chain<U>(chainer: Fn<R, Either<L, U>>): Either<L, U>;
}

export class Left<L, R> implements Either<L, R> {
  constructor(private readonly obj: L) {}

  map<U>(mapper: Fn<R, U>): Either<L, U> {
    return new Left<L, U>(this.obj);
  }

  chain<U>(chainer: Fn<R, Either<L, U>>): Either<L, U> {
    return new Left<L, U>(this.obj);
  }
}

export class Right<L, R> implements Either<L, R> {
  constructor(private readonly obj: R) {}

  map<U>(mapper: Fn<R, U>): Either<L, U> {
    return new Right<L, U>(mapper(this.obj));
  }

  chain<U>(chainer: Fn<R, Either<L, U>>): Either<L, U> {
    return chainer(this.obj);
  }
}
