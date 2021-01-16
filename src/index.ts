import { createSelector } from "reselect";

export type Selectors<Root, T> = {
  [K in keyof T as `select${Capitalize<string & K>}`]: (state: Root) => T[K];
};

export const selectorify = <
  Root,
  K extends keyof Type,
  Type extends { [key in K]: Type[K] }
>(
  rootSelector: (root: Root) => Type,
  shape: Type
): Selectors<Root, Type> => {
  return Object.keys(shape).reduce(
    (result: Partial<Selectors<Root, Type>>, key) => {
      result[key] = createSelector(rootSelector, (state: Type) => state[key]);
      return result;
    },
    {}
  ) as Selectors<Root, Type>;
};
