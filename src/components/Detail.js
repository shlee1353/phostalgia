import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { closeDetail, updateDetail } from '../actions/photoDetail'
import musics from '../api/music.json';
import ReactSwipe from 'react-swipe';

class Detail extends Component {

  constructor(props) {
    super(props);

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  componentDidMount() {
    this.setGoogleMap(this.props.latitude, this.props.longitude);
  }

  setGoogleMap(lat, lng) {
    const google = window.google;
    const location = {
      lat, lng
    };
    const mapContainer = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      scrollwheel: false,
      keyboardShortcuts: false,
      fullscreenControl: true,
      disableDoubleClickZoom: false,
      draggable: true,
      center: location
    });
    const marker = new google.maps.Marker({
      position: location,
      map: mapContainer
    });

  }

  // setMusic() {
  //   this.matchMusicWeather(wasasd)
  // }
  //
  // matchMusicWeather(weather) {
  //   let musicUrl;
  //   return musicUrl
  // }

  convertTimestampToDate(timestamp){
    timestamp = timestamp * 1000;
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    // if (month < 10) {
    //   month = `0${month}`;
    // }
    // if (day < 10) {
    //   day = `0${day}`;
    // }
    return `${year}. ${month}. ${day}.`;
  }

  randomMusic(weather) {
    console.log(musics[weather]);
    const length = musics[weather].length;
    const musicIndex = 3;
    console.log(musicIndex);
    return musics[weather][musicIndex].mp3Url
  }

  next() {
    this.refs.reactSwipe.next();
  }

  prev() {
    this.refs.reactSwipe.prev();
  }

  render() {
    const { date, weather, location, description, updateDetail, index } = this.props;
    const { photos } = this.props;
    const self = this;
    const currentIndex = index;
    const swipeOptions = {
      startSlide: currentIndex,
      // auto: 1000,
      callback() {
        console.log('slide changed');
      },
      transitionEnd(index, el) {
        console.log('ended transition');
        console.log(index);
        console.log(el);
        updateDetail(photos[index]);
        self.setGoogleMap(photos[index].latitude, photos[index].longitude);
      }
    };
    return (
      <div className='photo_detail'>

        <div className='photo_area'>
          <ReactSwipe
            className="carousel"
            swipeOptions={swipeOptions}
            ref='reactSwipe'
          >
            {photos.map((item, index) => {
              return (
                <div className='item' key={index}>
                  <img src={item.imgUrl} width='100%' alt='' />
                </div>
              )})
            }
          </ReactSwipe>
          <span className='equalizer'>
            <span className='eq1' />
            <span className='eq2' />
            <span className='eq3' />
          </span>
          <button
            type='button'
            className='btn_swiper_prev'
            onClick={this.prev}
          >
            <i className='fa fa-angle-left' />
          </button>
          <button
            type='button'
            className='btn_swiper_next'
            onClick={this.next}
          >
            <i className='fa fa-angle-right' />
          </button>
          <div className='info'>
            <div className='info_inner'>
              {this.convertTimestampToDate(date)}<br />
              {/*{weather}*/}
              <span className='area'>
                {location.city}
              </span>
            </div>
          </div>
        </div>

        <div className='desc_area'>
          {description}
        </div>

        <div className='map_area'>
          <div id='map' style={{ height: 160 }} />
        </div>

        <button
          type='button'
          className='btn_close'
          onClick={this.props.closeDetail}
        />

        <audio src={this.randomMusic(weather)} className='player' autoPlay />

      </div>
    )
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  closeDetail: bindActionCreators(closeDetail, dispatch),
  updateDetail: bindActionCreators(updateDetail, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail)