import React from 'react';
import exif from 'exif-js';
import axios from 'axios';
import googleMaps from '@google/maps';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentImage, imageUpload } from '../actions/imageUpload'

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  getImageData(file, reader) {
    const { currentImage } = this.props;
    let self = this;
    
    exif.getData(file, function() {
      const originDate = exif.getTag(this, "DateTimeOriginal");
      const latitude = self.convertDecimal(exif.getTag(this, "GPSLatitude")); // 위도 있을지 없을지 모름
      const longitude = self.convertDecimal(exif.getTag(this, "GPSLongitude")); // 경도 있을지 없을지 모름
      const ymd = originDate.split(' ')[0].replace(/:/g, '-');
      const hms = originDate.split(' ')[1];
      const date = Math.floor(new Date([ymd, hms].join(' ')).getTime() / 1000); // 시간
      const api_date = originDate.split(/ |:/g).slice(0, 5).join(''); // api 시간용
      
      console.log(api_date);
      
      axios.get('http://apis.skplanetx.com/weather/history/observation', {
        headers: {
          'appKey': 'e29be76e-8030-3aae-8e03-122a029340c3'
        },
        params: {
          version: 1,
          lat: latitude,
          lon: longitude,
          isTimeRange: 'Y',
          start: api_date,
          end: api_date
        }
      })
      .then((response) => {
        const googleMapClient = googleMaps.createClient({
          key: 'AIzaSyAppNcdl4QuplCtTbWYP9hMhlETamitoR4'
        })
        googleMapClient.reverseGeocode({
          latlng: `${latitude},${longitude}`,
        }, function(err, response) {
          if (!err) {
              const result = response.json.results[0].formatted_address.split(' ');
              const province = result[0];
              const city = result[1];
              const town = result[2];
              const fullAddress = response.json.results[0].formatted_address;
              const location = {province, city, town, fullAddress};
              currentImage({ 
                id: '3',
                weather: 'sunny',
                date, 
                imgUrl: reader.result,
                latitude, 
                longitude,
                location,
                description: ''
              })
          }
        });
      })
      .catch((error) => {
        console.log(error);
      }) 
      console.log(date, latitude, longitude);
      
    })
  }
  convertDecimal(gps) {
      if(gps === undefined) return gps
      return gps[0].numerator + gps[1].numerator /
        (60 * gps[1].denominator) + gps[2].numerator / (3600 * gps[2].denominator);
  }
  handleImageChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file);
    reader.onloadend = () => {
        this.getImageData(file, reader);
    }
    reader.readAsDataURL(file);
  }
  handleImageUpload = (e) => {
    const { imageUpload, getcurrentImageInfo } = this.props;
    console.log(getcurrentImageInfo);
    // axios.get('http://apis.skplanetx.com/weather/history/observation', {
    //   headers: {
    //     'appKey': 'e29be76e-8030-3aae-8e03-122a029340c3'
    //   },
    //   params: {
    //     version: 1,
    //     lat: 37.5714000000,
    //     lon: 126.9658000000,
    //     isTimeRange: 'Y',
    //     start: 201311071800,
    //     end: 201311072030
    //   }
    // })
    // .then((response) => {
    //   console.log(response);
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
    localStorage.setObject('photos', this.cloneAsObject(getcurrentImageInfo));    
    // imageUpload(getcurrentImageInfo);
    console.log("이미지 업로드");
  }

  handleImageDescriptionChange = (e) => {
    console.log(e.target);
    const { getcurrentImageInfo, currentImage } = this.props;
    const nextState = {
      ...getcurrentImageInfo,
      description: e.target.value
    }
    currentImage(nextState);
  }
  cloneAsObject(obj) {
      if(obj === null || !(obj instanceof Object)) {
        return obj;
      }
      var temp = (obj instanceof Array) ? [] : {};
      for (var key in obj) {
        temp[key] = this.cloneAsObject(obj[key]);
      }
      return temp;
    } 
  render() {
    const { getcurrentImageInfo } = this.props;
    return (
      <div>
        <input 
          type="file"
          onChange={(e) => this.handleImageChange(e)}
        />
        <button type='submit' onClick={(e) => this.handleImageUpload(e)}>이미지 업로드</button>
        <div className="image_preview">
          {getcurrentImageInfo.imgUrl &&
            <img src={getcurrentImageInfo.imgUrl} width="300" height="300" alt=""/>
          }
        </div>
        <div className="image_info">
          <label htmlFor="">시간</label>
          <input type="text" id="image_location" value={getcurrentImageInfo.date ? getcurrentImageInfo.date : ''}/>
          <label htmlFor="">위치</label>
          <input type="text" id="image_location" value={getcurrentImageInfo.location ? getcurrentImageInfo.location.fullAddress : ''}/>
          <label htmlFor="">날씨</label>
          <input type="text" id="image_weather" value={getcurrentImageInfo.weather ? getcurrentImageInfo.weather : ''}/>
          <label htmlFor="">설명</label>
          <textarea 
            id="image_description" 
            value={getcurrentImageInfo.description ? getcurrentImageInfo.description : ''}
            onChange={(e) => this.handleImageDescriptionChange(e)}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  getcurrentImageInfo: state.imageUpload.currentImageInfo
})

const mapDispatchToProps = (dispatch) => ({
  currentImage: bindActionCreators(currentImage, dispatch),
  imageUpload: bindActionCreators(imageUpload, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);