import { 
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  START_DO_TODO,
  STOP_DO_TODO
 } from '_constants/actions'

const todo = (state = {}, action) => {
  switch (action.type) {

    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }

    case TOGGLE_TODO:
      return {
        ...state,
        completed: !state.completed
      }

    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {

    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]

    case TOGGLE_TODO:
      return state.map(t =>
        t.id === action.id ? todo(t, action) : t
      )

    case REMOVE_TODO:
      return state.filter(t =>
        t.id !== action.id
      )

    default:
      return state
  }
}

export default todos