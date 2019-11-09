import { createSelector } from 'reselect';

const selectauth = state => state.auth;

export const selectUser = createSelector(
  [selectauth],
  auth => auth.user
);

export const selectLoggedinStatus = createSelector(
  [selectauth],
  auth => auth.loggedIn
)

export const selectError = createSelector(
  [selectauth],
  auth => auth.error
)