import { OPEN_DETAIL, CLOSE_DETAIL, RECOMMEND_PHOTO, UPDATE_DETAIL } from '../actions/photoDetail'

export default function showDetail(state = {show: false, photo: '', recommendPhoto: ''}, action) {
  switch (action.type) {
    case OPEN_DETAIL:
      return {
        ...state,
        show: true,
        photo: action.photo
      };
    case CLOSE_DETAIL:
      return {
        ...state,
        show: false
      };
    case RECOMMEND_PHOTO:
      return {
        ...state,
        recommendPhoto: action.recommendPhoto
      };
    case UPDATE_DETAIL:
      return {
        ...state,
        photo: action.photo
      };
    default:
      return state;
  }
};
