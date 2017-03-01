import { isNull } from 'lodash'

import initialState from '_redux/initialState'
import { START_DO_TODO, STOP_DO_TODO } from '_constants/actions'

const defaultState = {
  id: null,
  startTime: 0,
  nextActiveTodoId: null
}
const init = (initialState && initialState.activeTodo) || defaultState

const activeTodo = (state = init, action) => {

  switch (action.type) {

    case START_DO_TODO:
      if(isNull(state.id)){
        return {
          id: action.id,
          startTime: Date.now(),
          nextActiveTodoId: null
        }

      } else if(state.id !== action.id) {
        return {
          ...state,
          nextActiveTodoId: action.id
        }

      } else return state


    case STOP_DO_TODO:
      if(isNull(state.nextActiveTodoId)){
         return defaultState
      } else {
        return {
          id: state.nextActiveTodoId,
          startTime: Date.now(),
          nextActiveTodoId: null
        }
      }

    default:
      return state
  }
}

export default activeTodo