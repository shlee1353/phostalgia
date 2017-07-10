import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    currentCity:'',
    currentWeather:''
};

export default function weather (state = initialState, action) {
    switch(action.type) {
        case types.SETWEATHER:
        const data = action.data.data;
            return {
           		currentCity: data.name,
           		currentWeather: data.weather[0].main
            }
        default:
            return state;
    }
};