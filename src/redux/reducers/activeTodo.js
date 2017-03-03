import initialState from '_redux/initialState'
import {
  SAVE_ACTIVE_TIMER_ELAPSED_TIME_and_START_DO_TODO,
  SAVE_ACTIVE_TIMER_ELAPSED_TIME_and_STOP_DO_TODO
} from '_constants/actions'

const defaultState = {
  id: null,
  startTime: 0
}
const init = (initialState && initialState.activeTodo) || defaultState

const activeTodo = (state = init, action) => {

  switch (action.type) {

    case SAVE_ACTIVE_TIMER_ELAPSED_TIME_and_START_DO_TODO:
      return {
        id: action.activeTodoId,
        startTime: Date.now()
      }

    case SAVE_ACTIVE_TIMER_ELAPSED_TIME_and_STOP_DO_TODO:
      return defaultState

    default:
      return state
  }
}

export default activeTodo