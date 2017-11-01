import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import App from './components/App.js'
import reducer from './reducers'

let logger = createLogger({
	predicate: (getState, action) => action.type !== SAVE_AVATAR
})

let store = true ? createStore(reducer, applyMiddleware(thunkMiddleware, logger))  : createStore(reducer, applyMiddleware(thunkMiddleware))

render(
	<Provider store={store}>
		<App />
	</Provider>,
  	document.getElementById('app')
)
