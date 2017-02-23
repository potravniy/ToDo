import React, { Component } from 'react'
import { Provider } from 'react-redux'

import createStore from '_redux/createStore'
import addListeners from '_listeners/index'
import Container from '_containers/Container'
import IntlProvider from '_intl/IntlProvider'

const store = createStore()

addListeners( store )

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <IntlProvider>
          <Container />
        </IntlProvider>
      </Provider>
    )
  }
}
