import { createSelector, Selector, createStructuredSelector } from "reselect";

export type Selectors<Root, T, Prefix extends string = ""> = {
  [K in keyof T as `select${Capitalize<Prefix>}${Capitalize<string & K>}`]: (
    state: Root
  ) => T[K];
};

const capitalize = (str?: string) => {
  if (!str) {
    return "";
  }
  return `${str.substr(0, 1).toUpperCase()}${str.substr(1)}`;
};

export const selectorify = <
  Root,
  K extends keyof Type,
  Type extends { [key in K]: Type[K] },
  Prefix extends string = ""
>(
  rootSelector: (root: Root) => Type,
  shape: Type,
  prefix?: Prefix
): Selectors<Root, Type, Prefix> => {
  return Object.keys(shape).reduce(
    (result: Partial<Selectors<Root, Type, Prefix>>, key) => {
      result[`select${capitalize(prefix)}${capitalize(key)}`] = createSelector(
        rootSelector,
        (state: Type) => state[key]
      );
      return result;
    },
    {}
  ) as Selectors<Root, Type, Prefix>;
};

export type SelectorsMap<Root, T> = (
  state: Root
) => {
  [K in keyof T]: T[K];
};

const uncapitalize = (str?: string) => {
  if (!str) {
    return "";
  }
  return `${str.substr(0, 1).toLowerCase()}${str.substr(1)}`;
};

const cutIndex = "select".length;

type Unwrap<K> = Uncapitalize<
  Extract<K, string> extends `select${infer R}` ? R : never
>;

export const mapSelectors = <Root>() => <T>(
  selectors: { [K in keyof T]: Selector<Root, T[K]> }
): ((
  state: Root
) => {
  [K in keyof T as Unwrap<K>]: T[K];
}) => {
  // type FinalMap = { [K in keyof T as Unwrap<K>]: Selector<Root, T[K]> };
  const selectorMap = Object.keys(selectors).reduce((composition, key) => {
    composition[uncapitalize(key.substr(cutIndex))] = selectors[key];
    return composition;
  }, {});
  // TODO: try to properly type FinalMap
  return createStructuredSelector(selectorMap as any);
};
