import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import photoDetail from './photoDetail'
import loading from './loading'
import imageUpload from './imageUpload'
import photoOption from './photoOption'

const reducers = combineReducers({
	visibilityFilter,
  photoDetail,
  loading,
  imageUpload,
  photoOption
});

export default reducers
