import { createSelector } from "reselect";

export type Selectors<Root, T, Prefix extends string = ""> = {
  [K in keyof T as `select${Capitalize<Prefix>}${Capitalize<string & K>}`]: (state: Root) => T[K];
};

const capitalize = (str?: string) => {
  if (!str) {
    return "";
  }
  return `${str.substr(0, 1).toUpperCase()}${str.substr(1)}`
}

export const selectorify = <
  Root,
  K extends keyof Type,
  Type extends { [key in K]: Type[K] },
  Prefix extends string = "",
>(
  rootSelector: (root: Root) => Type,
  shape: Type,
  prefix?: Prefix,
): Selectors<Root, Type, Prefix> => {
  return Object.keys(shape).reduce(
    (result: Partial<Selectors<Root, Type, Prefix>>, key) => {
      result[`select${capitalize(prefix)}${capitalize(key)}`] = createSelector(rootSelector, (state: Type) => state[key]);
      return result;
    },
    {}
  ) as Selectors<Root, Type, Prefix>;
};
