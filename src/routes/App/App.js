import React from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Filter from '../../components/Filter'
import PhotoList from '../../components/PhotoList'
import Loading from '../../components/Loading'
// import ImageUpload from '../../components/ImageUpload'
import BtnFilter from '../../components/BtnFilter'
import BtnView from '../../components/BtnView'

import googleMaps from '@google/maps';
import axios from 'axios';
import photo from '../../api/photo.json'
import translate from '../../api/translate.json'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {loadingComplete, loadingFail} from '../../actions/loading.js'
import {setVisibilityFilter} from '../../actions/visibilityFilter'
import {recommendPhoto} from '../../actions/photoDetail'
import { photoSettingBtnToggle } from '../../actions/photoOption';


class App extends React.Component {

  componentWillMount() {
    Storage.prototype.setObject = function (key, value) {
      this.setItem(key, JSON.stringify(value));
    }
    Storage.prototype.getObject = function (key) {
      return this.getItem(key) && JSON.parse(this.getItem(key));
    }
  }

  componentDidMount() {
    this.getCurrentLocation(this.getCurrentWeather);
  }

  getCurrentLocation = (callback) => {
    const self = this;
    const gpsCache = localStorage.getObject('gps');
    const gpsCacheTime = 3000000;
    if (gpsCache && self.useGpsCache(gpsCache, gpsCacheTime)) {
      this.completeLoading();
    }
    else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        localStorage.setObject('gps', self.cloneAsObject(pos));
        const googleMapClient = googleMaps.createClient({
          key: 'AIzaSyAppNcdl4QuplCtTbWYP9hMhlETamitoR4'
        })
        googleMapClient.reverseGeocode({
          latlng: `${pos.coords.latitude},${pos.coords.longitude}`,
          result_type: 'locality'
        }, function (err, response) {
          if (!err) {
            callback(pos.coords.latitude, pos.coords.longitude);
          }
        });

      }, function (e) { // 에러 발생
        const {recommendPhoto, loadingFail} = self.props;
        const randomPhoto = self.getRandomPhoto(photo, 'all');
        recommendPhoto(randomPhoto);
        console.log(e.message);
        loadingFail();
      }, {
        enableHighAccuracy: false,
        maximumAge: 1000000,
        timeout: 5000,
      });

    } else {
      alert('이 브라우저에서는 위치정보를 받을 수 없습니다')
    }
  }

  // 현재 날씨정보
  getCurrentWeather = (lat, lon) => {
    axios.get('http://apis.skplanetx.com/weather/current/minutely', {
      headers: {
        'appKey': 'e29be76e-8030-3aae-8e03-122a029340c3'
      },
      params: {
        version: 1,
        lat,
        lon
      }
    })
      .then((response) => {
        localStorage.setObject('weather', this.cloneAsObject(response));
        this.completeLoading();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // 추천 할 사진
  getRandomPhoto = (photo, weather) => {

    let weatherRecommend = {};
    let photoItem;
    photo.map(item => {
      if (weatherRecommend[item.weather] === undefined) weatherRecommend[item.weather] = [];
      weatherRecommend[item.weather] = [...weatherRecommend[item.weather], item];
    });
    for (photoItem in weatherRecommend) {
      const randomPhoto = Math.floor(Math.random() * weatherRecommend[photoItem].length);
      weatherRecommend[photoItem] = weatherRecommend[photoItem][randomPhoto].id;
    }
    if (weather === '구름많음') weather = '흐림';
    if (weather !== 'all')
      weatherRecommend['all'] = weatherRecommend[this.translateWeatherWord(weather)];
    else {
      const randomWeather = Math.floor(Math.random() * 4);
      weatherRecommend['all'] = weatherRecommend[Object.keys(weatherRecommend)[randomWeather]];
    }

    return weatherRecommend;
  }

  completeLoading = () => {
    const {recommendPhoto, setVisibilityFilter, loadingComplete} = this.props;
    const tabFilter = (filter) => {
      switch (filter) {
        case 'sunny':
          return 'SHOW_SUNNY';
        case 'cloudy':
          return 'SHOW_CLOUDY';
        case 'rainy':
          return 'SHOW_RAINY';
        case 'snowy':
          return 'SHOW_SNOWY';
        default:
          return 'SHOW_ALL'
      }
    }
    const weatherCache = localStorage.getObject('weather');
    console.log(weatherCache);
    const currentWeather = weatherCache.data.weather.minutely[0];
    const randomPhoto = this.getRandomPhoto(photo, currentWeather.sky.name);
    console.log(randomPhoto);
    recommendPhoto(randomPhoto);
    setVisibilityFilter(tabFilter(this.translateWeatherWord(currentWeather.sky.name, false)));
    loadingComplete();
  }

  // 날씨 한글 번역
  translateWeatherWord(photoWeather, englishToKorean) {
    let word;
    if (englishToKorean) {
      for (word in translate) {
        if (photoWeather === word) return translate[word]
      }
    }
    else {
      for (word in translate) {
        if (photoWeather === translate[word]) return word
      }
    }
  }

  useGpsCache(gps, time) {
    const gpsTime = Math.floor(gps.timestamp / 1000);
    const currentTime = Math.floor(new Date().getTime() / 1000);
    return currentTime - gpsTime <= time
  }

  cloneAsObject(obj) {
    if (obj === null || !(obj instanceof Object)) {
      return obj;
    }
    var temp = (obj instanceof Array) ? [] : {};
    for (var key in obj) {
      temp[key] = this.cloneAsObject(obj[key]);
    }
    return temp;
  }
  handlePhotoSettingToggle = (e) => {
    const { photoSettingBtnToggle } = this.props;
    photoSettingBtnToggle();
  };

  render() {
    const {loading, btnSettingToggle, isDetail} = this.props;
    console.log(this.props);
    return (
      <div id='wrap' className={`wrap ${isDetail ? 'open_detail' : ''}`}>
        <Header
          handlePhotoSettingToggle={this.handlePhotoSettingToggle}
        />
        {btnSettingToggle &&
        <div className="setting_area">
          <div className='setting_group group_filter'>
            <strong className='tit'>FILTER</strong>
            <BtnFilter addClass='btn_filter_basic' name='' value='Original' />
            <BtnFilter addClass='btn_filter_bnw' name='filter_bnw' value='B&W' />
            <BtnFilter addClass='btn_filter_basic' name='filter_vignette' value='Vinette' />
          </div>
          <div className='setting_group'>
            <strong className='tit'>VIEW TYPE</strong>
            <BtnView addClass='btn_viewtype_tile' name='view_tile' icon='fa-th' />
            <BtnView addClass='btn_viewtype_list' name='' icon='fa-th-list' ariaLabel='목록형' />
          </div>
        </div>
        }
        <div id='container' className='container'>
          {loading.loading &&
          <div id='content' className='content' role='main'>
            <div className='layout_inner'>
              <Filter />
              <PhotoList
                mainPhoto={loading.currentWeatherPhoto}
              />
              {/*<ImageUpload />*/}
            </div>
          </div>
          }
          {!loading.loading &&
          <div id='content' className='content' role='main'>
            <div className='layout_inner'>
              <Loading
                message={loading.message}
              />
            </div>
          </div>
          }
        </div>

        <Footer />

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.loading,
  getFilterSelect: state.photoOption.photo_filter,
  getViewSelect: state.photoOption.photo_view,
  isDetail: state.photoDetail.show,
  btnSettingToggle: state.photoOption.setting_btn_view,
});

const mapDispatchToProps = (dispatch) => ({
  loadingComplete: bindActionCreators(loadingComplete, dispatch),
  loadingFail: bindActionCreators(loadingFail, dispatch),
  setVisibilityFilter: bindActionCreators(setVisibilityFilter, dispatch),
  recommendPhoto: bindActionCreators(recommendPhoto, dispatch),
  photoSettingBtnToggle: bindActionCreators(photoSettingBtnToggle, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
