# selectorify

simple selectors generator

## installation

```
yarn add selectorify
```

## Usage

```ts
import { selectorify } from "selectorify";

const getUser = ({ user }: RootState) => user;

const defaultState: User = {
  firstName: string,
  lastName: string,
  avatar: string,
};

export const selectors = selectorify(getUser);

const firstName = selectors.selectFirstName(rootState);
```
