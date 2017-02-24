import { 
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  START_DO_TODO,
  STOP_DO_TODO,
  SET_VISIBILITY_FILTER
 } from '_constants/actions'

let nextTodoId = 0

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text
  }
}

export const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    id
  }
}

export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    id
  }
}

export const startDoTodo = (id) => {
  return {
    type: START_DO_TODO,
    id
  }
}

export const stopDoTodo = (id) => {
  return {
    type: STOP_DO_TODO,
    id
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}