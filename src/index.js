import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {Provider} from 'react-redux';
import './css/style.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore); 
const store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());
console.log(store.getState())

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);