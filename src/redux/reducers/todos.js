import { arrayMove } from 'react-sortable-hoc';

import getUniqId from '_utils/getUniqId'
import initialState from '_redux/initialState'
import { 
  ADD_TODO,
  REMOVE_TODO,
  SAVE_ACTIVE_TIMER_ELAPSED_TIME,
  SORT_TODOS,
  TOGGLE_TODO
 } from '_constants/actions'

const todo = (state = {}, action) => {
  switch (action.type) {

    case TOGGLE_TODO:
      return {
        ...state,
        completed: !state.completed
      }

    case SAVE_ACTIVE_TIMER_ELAPSED_TIME:
      return {
        ...state,
        elapsedTime: state.elapsedTime + Date.now() - action.activeTodoStartTime
      }

    default:
      return state
  }
}

const init = (initialState && initialState.todos) || []

const todos = (state = init, action) => {
  switch (action.type) {

    case ADD_TODO:
      return [
        ...state,
        {
          id: getUniqId(state) ,
          text: action.text,
          completed: false,
          elapsedTime: 0
        }
      ]

    case REMOVE_TODO:
      return state.filter(t =>
        t.id !== action.id
      )

    case SORT_TODOS:
      return arrayMove(state, action.oldIndex, action.newIndex)

    case TOGGLE_TODO:
    case SAVE_ACTIVE_TIMER_ELAPSED_TIME:
      return state.map(t =>
        t.id === action.id ? todo(t, action) : t
      )

    default:
      return state
  }
}

export default todos