import { 
  ADD_TODO,
  REMOVE_TODO,
  SAVE_ACTIVE_TIMER_ELAPSED_TIME,
  SET_VISIBILITY_FILTER,
  SORT_TODOS,
  START_DO_TODO,
  STOP_DO_TODO,
  TOGGLE_TODO
 } from '_constants/actions'

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
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

export const saveActiveTimerElapsedTime = (id, activeTodoStartTime) => {
  return {
    type: SAVE_ACTIVE_TIMER_ELAPSED_TIME,
    id,
    activeTodoStartTime
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

export const reorderTodos = (oldIndex, newIndex) => {
  return {
    type: SORT_TODOS,
    oldIndex,
    newIndex
  }
}