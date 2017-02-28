import { arrayMove } from 'react-sortable-hoc';

import getUniqId from '_utils/getUniqId'
import initialState from '_redux/initialState'
import { 
  ADD_TODO,
  REMOVE_TODO,
  SORT_TODOS,
  STOP_DO_TODO,
  TOGGLE_TODO
 } from '_constants/actions'

const todo = (state = {}, action) => {
  switch (action.type) {

    case TOGGLE_TODO:
      return {
        ...state,
        completed: !state.completed
      }

    case STOP_DO_TODO:
      return {
        ...state,
        elapsedTime: action.elapsedTime
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

    case TOGGLE_TODO:
    case STOP_DO_TODO:
      return state.map(t =>
        t.id === action.id ? todo(t, action) : t
      )

    case REMOVE_TODO:
      return state.filter(t =>
        t.id !== action.id
      )

    case SORT_TODOS:
      return arrayMove(state, action.oldIndex, action.newIndex)

    default:
      return state
  }
}

export default todos