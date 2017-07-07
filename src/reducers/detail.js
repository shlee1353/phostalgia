import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    showDetail : '',
    selectedKey : '',
    photoLength : ''
};

const slidePhoto = (state, action) => {
    let count = 0,
        len = state.photoLength,
        key = state.selectedKey;

    switch (action.filter) {
        case 'prev':
            return count = (len - key === len) ? 0 : -1 ;
            break;
        case 'next':
            return count = (len - key === 1) ? 0 : 1 ;
            break;
        default:
            return count;
    };
}

export default function detail (state = initialState, action) {
    switch(action.type) {
        case types.SHOWDETAIL:
            return {
                showDetail : update(state.showDetail, {$set: action.flag}),
                selectedKey : update(state.selectedKey, {$set: action.key}),
                photoLength : update(state.photoLength, {$set: action.len})
            }
        case types.CLOSEDETAIL:
            return {
                showDetail : update(state.showDetail, {$set: action.flag}),
                selectedKey : state.selectedKey,
                photoLength : state.photoLength
            }
        case types.SLIDEPHOTO:
            let count = slidePhoto(state, action)
            return {
                showDetail : state.showDetail,
                selectedKey : update(state.selectedKey, {$set: state.selectedKey + count}),
                photoLength : state.photoLength
            }
        default:
            return state;
    }
};