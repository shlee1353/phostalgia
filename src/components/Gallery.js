import React, { Component } from 'react';
import Filter from './Filter';
import List from './List';
import PhotoDetail from './PhotoDetail';
import { connect } from 'react-redux';
import * as actions from '../actions';
import photoData from '../api/photo.json';

class Counter extends Component {
    componentWillMount() {
        this.props.handleSetData(photoData);
        this.props.handleShowDetail();
    };
    render() {
        const props = this.props;
        return(
            <div>
                <header id='header' className='header' role='banner'>
                    <a href='#'>PHOSTALGIA</a>
                </header>
                <Filter />
                <List
                    {...props}
                />
                {props.showDetail 
                    &&
                <PhotoDetail 
                    {...props}
                />}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        filteredData: state.filter.filteredData,
        showDetail: state.detail.showDetail,
        selectedKey: state.detail.selectedKey
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSetData: (data) => { dispatch(actions.setData(data))},
        handleShowDetail: (flag, key, len) => { dispatch(actions.showDetail(flag, key, len))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
