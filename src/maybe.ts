import { Fn } from "./common";

export interface Maybe<T> {
  map<U>(mapper: Fn<T, U>): Maybe<U>;
  chain<U>(chainer: Fn<T, Maybe<U>>): Maybe<U>;
}

export class Just<T> implements Maybe<T> {
  constructor(private readonly obj: T) {}
  map<U>(mapper: Fn<T, U>): Maybe<U> {
    return new Just<U>(mapper(this.obj));
  }
  chain<U>(chainer: Fn<T, Maybe<U>>): Maybe<U> {
    return chainer(this.obj);
  }
}

export class Nothing<T> implements Maybe<T> {
  map<U>(mapper: Fn<T, U>): Maybe<U> {
    return new Nothing<U>();
  }
  chain<U>(chainer: Fn<T, Maybe<U>>): Maybe<U> {
    return new Nothing<U>();
  }
}

export const fromList = <T>(xs: T[]): Maybe<T> =>
  xs.length > 0 ? new Just(xs[0]) : new Nothing<T>();
