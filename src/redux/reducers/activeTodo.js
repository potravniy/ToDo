import initialState from '_redux/initialState'
import { START_DO_TODO, STOP_DO_TODO } from '_constants/actions'

const defaultState = {
  id: null,
  startTime: 0
}
const init = (initialState && initialState.activeTodo) || defaultState

const activeTodo = (state = init, action) => {

  switch (action.type) {

    case START_DO_TODO:
      return {
        id: action.id,
        startTime: Date.now()
      }

    case STOP_DO_TODO:
      return defaultState

    default:
      return state
  }
}

export default activeTodo