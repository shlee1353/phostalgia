import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    photoData : [],
    filteredData : [],
    currentFilter : ''
};

const filterList = (state, action) => {
    let newData = state.photoData.filter((item, index) => {
        return item.weather === action.filter;
    });
    return newData;
};

export default function filter (state = initialState, action) {
    switch(action.type) {
        case types.SETINITIALDATA:
            return {
                photoData : update(state.photoData, {$set: action.data}),
                filteredData : update(state.filteredData, {$set: action.data}),
                currentFilter : state.currentFilter
            }
        case types.FILTERIDCONDITION:
            let filteredData = filterList(state, action);
            return {
                photoData : state.photoData,
                filteredData: update(state.filteredData, {$set: filteredData}),
                currentFilter : update(state.currentFilter, {$set: action.filter})
        };
        default:
            return state;
    }
};