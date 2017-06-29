// action types
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

// action creators
export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}
