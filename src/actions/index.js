import * as types from './ActionTypes';
import axios from 'axios';
const api_key = '98e5058d35e2ce15ce97704c1dd2088a';
const api_url = 'http://api.openweathermap.org/data/2.5/weather?id=1835848&APPID=' + api_key;

export const filterCondition = (filter) => {
	return {
		type : types.FILTERIDCONDITION,
		filter
	}
}

export const setData = (data) => {
	return {
		type : types.SETINITIALDATA,
		data : data
	}
}

export const showDetail = (flag, key, len) => {
	return {
		type : types.SHOWDETAIL,
		flag : flag,
		key : key,
		len : len
	}
}

export const closeDetail = () => {
	return {
		type : types.CLOSEDETAIL,
		flag : false
	}
}

export const slidePhoto = (filter) => {
	return {
		type : types.SLIDEPHOTO,
		filter
	}
}

export const getWeather = () => {
	return dispatch => {
		axios.get(api_url)
			.then(function(result){
				dispatch(setWeather(result));
			})
			.catch((error) => {
				console.log('error');
			})
	}
}

export const setWeather = (data) => {
	return {
		type : types.SETWEATHER,
		data
	}
}
