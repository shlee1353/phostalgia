import { IMAGE_UPLOAD, CURRENT_IMAGE } from '../actions/imageUpload';

const initialState = {
  uploadImageInfo: '',
  currentImageInfo: ''
}
export default function imgUpload(state = initialState, action) {
  switch(action.type) {
    case IMAGE_UPLOAD:
      return {
          ...state,
          uploadImageInfo: action.uploadImageInfo
      }
    case CURRENT_IMAGE:
      return {
        ...state,
        currentImageInfo: action.currentImageInfo
      }
    default:
      return state
  }
}