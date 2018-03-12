import { Semigroup } from "./semigroup";
import { Monoid } from "./monoid";

export interface STM {
  exec(): Promise<void>;
  rollback(): Promise<void>;
}

export const stmSemigroup: Semigroup<STM> = {
  append: (x, y) => ({
    exec: () => x.exec().then(() => y.exec()),
    rollback: () => y.rollback().then(() => x.rollback())
  })
};

export const stmMonoid: Monoid<STM> = {
  empty: {
    exec: () => Promise.resolve(),
    rollback: () => Promise.resolve()
  },
  ...stmSemigroup
};
