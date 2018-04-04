import { Monoid } from "./monoid";
import { Semigroup } from "./semigroup";
import { Fn } from "./common";

export enum Ordering {
  GT = 1,
  LT = -1,
  EQ = 0
}

export const OrderingSemigroup: Semigroup<Ordering> = {
  append: (x: Ordering, y: Ordering) => (x === Ordering.EQ ? y : x)
};

export const OrderingMonoid: Monoid<Ordering> = {
  empty: Ordering.EQ,
  ...OrderingSemigroup
};

export interface Ord<A> {
  compare(x: A, y: A): Ordering;
}

export const contramap = <A, B>(f: Fn<B, A>, O: Ord<A>): Ord<B> => ({
  compare: (x: B, y: B) => O.compare(f(x), f(y))
});

export const getOrdSemigroup = <A>(): Semigroup<Ord<A>> => ({
  append: (x: Ord<A>, y: Ord<A>) => ({
    compare: (x1: A, y1: A) =>
      OrderingSemigroup.append(x.compare(x1, y1), y.compare(x1, y1))
  })
});

export const getOrdMonoid = <A>(): Monoid<Ord<A>> => ({
  empty: {
    compare: (x: A, y: A) => Ordering.EQ
  },
  ...getOrdSemigroup()
});

export const unsafeCompare = (x: any, y: any): Ordering =>
  x < y ? Ordering.LT : x > y ? Ordering.GT : Ordering.EQ;

export const sortWith = <A, B>(O: Ord<A>, f: Fn<B, A>, xs: B[]): B[] =>
  xs.sort(contramap(f, O).compare);

export const sort = <T>(O: Ord<T>, xs: T[]): T[] => xs.sort(O.compare);
