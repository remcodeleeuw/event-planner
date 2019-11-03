import { createSelector } from 'reselect';

const selectEvent = state => state.event;

export const selectEvents = createSelector(
  [selectEvent],
  event => event.events
);

export const selectSingleEvent = createSelector(
  [selectEvent],
  event => event.selectedEvent
)


export const selectAttending = createSelector(
  [selectEvent],
  event => event.attending
)

export const selectLoading = createSelector(
  [selectEvent],
  event => event.loading
)