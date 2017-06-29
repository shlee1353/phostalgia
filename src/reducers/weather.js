import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    
};

export default function weather (state = initialState, action) {
    switch(action.type) {
        case types.SETWEATHER:
        console.log(action.data)
            return {
           
            }
        default:
            return state;
    }
};