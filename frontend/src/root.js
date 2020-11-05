import React from "react"
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'

import configureStore from './stores/configure'
import App from './app'

const store = configureStore()

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default hot(Root)
