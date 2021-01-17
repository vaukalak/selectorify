import { selectorify, SelectorsMap, mapSelectors } from "../src";

type User = {
  firstName: string;
  lastName: string;
  avatar: string;
};

type RootState = {
  activeUser: User;
};

const defaultState: User = {
  firstName: "test",
  lastName: "user",
  avatar: "https://domain-that-never-existed.com",
};

const testRootState = {
  activeUser: defaultState,
};

const { selectFirstName, selectLastName } = selectorify(
  ({ activeUser }: RootState) => activeUser,
  defaultState,
);

const firstName: string = selectFirstName(testRootState);

const selectors = selectorify(
  ({ activeUser }: RootState) => activeUser,
  defaultState,
  "activeUser",
);

const lastName: string = selectors.selectActiveUserLastName(testRootState);

const structured = mapSelectors<RootState>()({
  selectFirstName,
  selectLastName,
});

structured(testRootState).firstName;
const a: string = structured(testRootState).lastName;
