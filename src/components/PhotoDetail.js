import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions';
import SlideButton from './SlideButton'

class PhotoDetail extends Component {

    componentDidMount() {
        this.props.handleSetWeather()
    }

    render() {
        const showDetail = () => {
            let photo = this.props.filteredData[this.props.selectedKey];
            return (
                <div>
                    <img src={photo.imgUrl} alt="" />
                    <div className="photo_info">{photo.date}</div>
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
                    <div className="photo_info">{this.props.currentCity}</div>
                    <div className="photo_info">{this.props.currentWeather}</div>
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

const mapStateToProps = (state) => {
    return {
        currentCity: state.weather.currentCity,
        currentWeather: state.weather.currentWeather
    };
};

const mapDispatchToProps = (dispatch) => ({
    closeClick: () => { dispatch(actions.closeDetail())},
    handleSetWeather: (data) => { dispatch(actions.getWeather())}
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail)