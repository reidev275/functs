import { Monoid, productMonoid, sumMonoid } from "./monoid";

export interface Group<A> extends Monoid<A> {
  invert(a: A): A;
}

export const sumGroup: Group<number> = {
  ...sumMonoid,
  invert: (a: number) => -a
};

export const productGroup: Group<number> = {
  ...productMonoid,
  invert: (a: number) => 1 / a
};
