import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { showDetail } from '../actions/photoDetail'
import Photo from './Photo'
import Detail from './Detail'

import photos from '../api/photo.json'

const updateVisiblePhotos = (filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return photos;
    case 'SHOW_SUNNY':
      return photos.filter(item => item.weather === 'sunny');
    case 'SHOW_CLOUDY':
      return photos.filter(item => item.weather === 'cloudy');
    case 'SHOW_RAINY':
      return photos.filter(item => item.weather === 'rainy');
    case 'SHOW_SNOWY':
      return photos.filter(item => item.weather === 'snowy');
    default:
      return new Error(`Unknown filter: ${filter}`)
  }
};

// 사진순서 
const remapPhoto = ( photos, recommendPhotoList, currentFilter ) => {
  let recommendIndex;
  let recommendPhotoId;
  if(currentFilter !== 'SHOW_ALL')
    recommendPhotoId = recommendPhotoList[photos[0].weather];
  else 
    recommendPhotoId = recommendPhotoList['all']; 
  photos.forEach((item, index) => {
    if(item.id === recommendPhotoId) {recommendIndex = index; return}
  });
  const recommendPhoto = eval('(' + JSON.stringify(photos[recommendIndex]) + ')');
  recommendPhoto.select = true;
  const remap = [recommendPhoto, ...photos.slice(0, recommendIndex), ...photos.slice(recommendIndex+1)] // 맨 앞으로 배치

  return remap;
}

const PhotoList = ({ photos, onPhotoClick, showDetail, currentPhoto, recommendPhotoList,  currentFilter, getPhotoFilterOption, getPhotoViewOption}) => (
  <div className={`photo_area ${getPhotoFilterOption}`}>
    <div className='photo_list'>
      <ul className={`list_photo ${getPhotoViewOption}`}>
        {remapPhoto(photos, recommendPhotoList, currentFilter).map((photo, index) => {
          photo.index = index;
          return <Photo
            key={photo.id}
            {...photo}
            onClick={() => onPhotoClick(photo)}
          />
          })
        }
      </ul>
    </div>

    {showDetail &&
      <Detail photos={remapPhoto(photos, recommendPhotoList, currentFilter)} {...currentPhoto} />
    }

  </div>
);

const mapStateToProps = (state) => ({
  photos: updateVisiblePhotos(state.visibilityFilter),
  currentFilter: state.visibilityFilter,
  showDetail: state.photoDetail.show,
  currentPhoto: state.photoDetail.photo,
  recommendPhotoList: state.photoDetail.recommendPhoto,
  getPhotoFilterOption: state.photoOption.photo_filter,
  getPhotoViewOption: state.photoOption.photo_view,
});

const mapDispatchToProps = (dispatch) => ({
  onPhotoClick: bindActionCreators(showDetail, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList)