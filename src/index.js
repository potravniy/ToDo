import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import createStore from '_redux/createStore'
import onStateChangeListener from '_listeners/saveToLocalStorage'
import App from '_components/App'

const store = createStore()

onStateChangeListener(store)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

