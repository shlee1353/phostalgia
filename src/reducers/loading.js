import { LOADING_COMPLETE, LOADING_FAIL } from '../actions/loading'

const initialState = {
    currentLocationWeather: '',
    currentWeatherPhoto: '',
    loading: false,
    message: '로딩중입니다'
}
export default function showDetail(state = initialState, action) {
  switch (action.type) {
    case LOADING_COMPLETE:
      return {
        ...state,
        loading: true,
        message: '로딩이 완료되었습니다'
      };
    case LOADING_FAIL:
      return {
        ...state,
        loading: true,
        message: '로딩이 실패하였습니다'
      }
    default:
      return state;
  }
};
