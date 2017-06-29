import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions';
import SlideButton from './SlideButton'
const api_key = '98e5058d35e2ce15ce97704c1dd2088a';
const api_url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=' + api_key;

class PhotoDetail extends Component {
    // componentWillMount() {
    //     var self = this;
    //     axios.get(api_url)
    //         .then(function(result){ 
    //             self.props.handleSetWeather(result);
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         })
    // }

    render() {
        const showDetail = () => {
            let photo = this.props.filteredData[this.props.selectedKey];
            return (
                <div>
                    <img src={photo.imgUrl} alt="" />
                    <div className="photo_date">{photo.date}</div>
                    <div className="btn_area">
                        <SlideButton filter='prev' name='prev' />
                        <SlideButton filter='next' name='next' />
                        <button
                            className="close_btn"
                            type='button' 
                            onClick={this.props.closeClick}
                        >
                        close
                        </button>
                    </div>
                </div>
            )
        }
        return(
            <div className="detail_photo">
              {showDetail()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    closeClick: () => { dispatch(actions.nextShowDetail())},
    handleSetWeather: (data) => { dispatch(actions.setWeather(data))}
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail)