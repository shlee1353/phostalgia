// action types
export const OPEN_DETAIL = 'OPEN_DETAIL';
export const UPDATE_DETAIL = 'OPEN_DETAIL';
export const CLOSE_DETAIL = 'CLOSE_DETAIL';
export const RECOMMEND_PHOTO = 'RECOMMEND_PHOTO';

// action creators
export function showDetail(photo) {
  return {
    type: OPEN_DETAIL,
    photo
  }
}

export function updateDetail(photo) {
  return {
    type: UPDATE_DETAIL,
    photo
  }

}

export function closeDetail() {
  return {
    type: CLOSE_DETAIL
  }
}

export function recommendPhoto(recommendPhoto) {
  return {
    type: RECOMMEND_PHOTO,
    recommendPhoto
  }
}