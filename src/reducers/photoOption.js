import { PHOTO_FILTER_SELECT, PHOTO_VIEW_SELECT, PHOTO_SETTING_BTN_TOGGLE } from '../actions/photoOption'

const initialState = {
  photo_filter: '',
  photo_view: 'view_tile',
  setting_btn_view: false
}
export default function showDetail(state = initialState, action) {
  switch (action.type) {
    case PHOTO_FILTER_SELECT:
      return {
        ...state,
        photo_filter: action.photo_filter
      }  
    case PHOTO_VIEW_SELECT:
      return {
        ...state,
        photo_view: action.photo_view
      }    
    case PHOTO_SETTING_BTN_TOGGLE:
      return {
        ...state,
        setting_btn_view: !state.setting_btn_view
      }
    default:
      return state;
  }
};
