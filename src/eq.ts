export interface Eq<A> {
  equals(x: A, y: A): boolean;
}

export const stringEq: Eq<string> = {
  equals: (x: string, y: string) => x === y
};

export const find = <A>(eq: Eq<A>, a: A, xs: A[]): A | undefined =>
  xs.find(x => eq.equals(a, x));
