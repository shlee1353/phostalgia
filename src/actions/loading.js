// action types
export const LOADING_COMPLETE = 'LOADING_COMPLETE';
export const LOADING_FAIL = 'LOADING_FAIL';

// action creators
export function loadingComplete() {
  return {
    type: LOADING_COMPLETE
  }
}
export function loadingFail() {
  return {
    type: LOADING_FAIL,
  }
}