// action types
export const IMAGE_UPLOAD = 'IMAGE_UPLOAD';
export const CURRENT_IMAGE = 'CURRENT_IMAGE';

// action creators
export function imageUpload(uploadImageInfo) {
  return {
    type: IMAGE_UPLOAD,
    uploadImageInfo
  }
}

export function currentImage(currentImageInfo) {
  return {
    type: CURRENT_IMAGE,
    currentImageInfo
  }
}