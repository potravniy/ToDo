import { createStore, compose } from 'redux'

import todoApp from '_reducers'

const devtoolsInterceptor = window.devToolsExtension ? window.devToolsExtension() : f => f
const finalCreateStore = compose(devtoolsInterceptor)(createStore)

export default function (customInitialState) {
  const store = finalCreateStore(todoApp, customInitialState)
  if (module.hot) {
    module.hot.accept('_reducers', () => {
      const nextRootReducer = require('_reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
