import {combineReducers} from 'redux';
import filter from './filter';
import detail from './detail';
import weather from './weather';

const reducers = combineReducers ({
	filter,
	detail,
	weather
});

export default reducers;