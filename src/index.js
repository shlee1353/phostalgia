import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore} from 'redux';
import reducers from './reducers';
import {Provider} from 'react-redux';
import './css/style.css';

const store = createStore(reducers);
console.log(store.getState())
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);