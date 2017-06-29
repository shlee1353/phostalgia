// action types
export const PHOTO_FILTER_SELECT = 'PHOTO_FILTER_SELECT';
export const PHOTO_VIEW_SELECT = 'PHOTO_VIEW_SELECT';
export const PHOTO_SETTING_BTN_TOGGLE = 'PHOTO_SETTING_BTN_TOGGLE';

// action creators
export function photoFilterSelect(photo_filter) {
  return {
    type: PHOTO_FILTER_SELECT,
    photo_filter
  }
}

export function photoViewSelect(photo_view) {
  return {
    type: PHOTO_VIEW_SELECT,
    photo_view
  }
}

export function photoSettingBtnToggle() {
  return {
    type: PHOTO_SETTING_BTN_TOGGLE
  }
}