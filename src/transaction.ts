type Fn<A> = () => A;
type Fn2<A, B> = (a: A) => B;

export class Transaction<A, R> {
  constructor(readonly fn: Fn<Promise<A>>, readonly rollback: Fn<Promise<R>>) {}

  map<U>(mapper: Fn2<A, U>): Transaction<U, R> {
    return new Transaction<U, R>(() => this.fn().then(mapper), this.rollback);
  }

  chain<U>(chainer: Fn2<A, Transaction<U, R>>): Transaction<U, R> {
    return new Transaction<U, R>(
      () => this.fn().then(a => chainer(a).fn()),
      //TODO: should include the rollback from applying `chainer`
      this.rollback
    );
  }

  async run(): Promise<A | R> {
    try {
      return await this.fn();
    } catch (e) {
      return await this.rollback();
    }
  }
}

new Transaction(() => Promise.reject("hello"), () => Promise.resolve(1))
  .run()
  .then(console.log);
