import * as types from './ActionTypes';

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

export const setWeather = (data) => {
	return {
		type : types.SETWEATHER,
		data
	}
}