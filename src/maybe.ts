import { Fn } from "./common";

export interface Maybe<T> {
  ap<U>(e: Maybe<Fn<T, U>>): Maybe<U>;
  map<U>(mapper: Fn<T, U>): Maybe<U>;
  chain<U>(chainer: Fn<T, Maybe<U>>): Maybe<U>;
  match<U>(nothing: () => U, just: Fn<T, U>): U;
}

export class Just<T> implements Maybe<T> {
  constructor(private readonly obj: T) {}
  ap<U>(e: Maybe<Fn<T, U>>): Maybe<U> {
    const t = this.obj;
    return e.map(f => f(t));
  }
  map<U>(mapper: Fn<T, U>): Maybe<U> {
    return new Just<U>(mapper(this.obj));
  }
  chain<U>(chainer: Fn<T, Maybe<U>>): Maybe<U> {
    return chainer(this.obj);
  }
  match<U>(nothing: () => U, just: Fn<T, U>): U {
    return just(this.obj);
  }
}

export class Nothing<T> implements Maybe<T> {
  ap<U>(e: Maybe<Fn<T, U>>): Maybe<U> {
    return new Nothing<U>();
  }
  map<U>(mapper: Fn<T, U>): Maybe<U> {
    return new Nothing<U>();
  }
  chain<U>(chainer: Fn<T, Maybe<U>>): Maybe<U> {
    return new Nothing<U>();
  }
  match<U>(nothing: () => U, just: Fn<T, U>): U {
    return nothing();
  }
}

export const fromList = <T>(xs: T[]): Maybe<T> =>
  xs.length > 0 ? new Just(xs[0]) : new Nothing<T>();
