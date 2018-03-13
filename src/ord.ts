export interface Eq<A> {
  equals(x: A, y: A): boolean;
}

export interface Ord<A> extends Eq<A> {
  lessThan(x: A, y: A): boolean;
}

export const sortWith = <T, U>(O: Ord<T>, f: (u: U) => T, xs: U[]): U[] =>
  xs.sort((a, b) => {
    const aa = f(a);
    const bb = f(b);
    if (O.equals(aa, bb)) {
      return 0;
    }
    return O.lessThan(aa, bb) ? -1 : 1;
  });

export const sort = <T>(O: Ord<T>, xs: T[]): T[] => sortWith(O, x => x, xs);
