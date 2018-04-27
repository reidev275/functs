export interface Lens<A, B> {
  get(a: A): B;
  set(b: B, a: A): A;
}

export const compose = <A, B, C>(x: Lens<A, B>, y: Lens<B, C>): Lens<A, C> => ({
  get: (a: A) => y.get(x.get(a)),
  set: (c: C, a: A) => {
    const b: B = x.get(a);
    const b2: B = y.set(c, b);
    return x.set(b2, a);
  }
});

//examples
interface Name {
  first: string;
  last: string;
}

interface Person {
  name: Name;
  age: number;
}

const nameFirstLens: Lens<Name, string> = {
  get: (a: Name) => a.first,
  set: (b: string, a: Name) => ({ ...a, first: b })
};

const personNameLens: Lens<Person, Name> = {
  get: (a: Person) => a.name,
  set: (b: Name, a: Person) => ({ ...a, name: b })
};

const personFirstNameLens = compose(personNameLens, nameFirstLens);

const me: Person = {
  name: { first: "Reid", last: "Evans" },
  age: 36
};

personFirstNameLens.get(me);
//Reid
personFirstNameLens.set("Miles", me);
// { name: { first: "Miles", last: "Evans" }, age: 36 }
