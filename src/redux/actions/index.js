import { 
  ADD_TODO,
  REMOVE_TODO,
  SAVE_ACTIVE_TIMER_ELAPSED_TIME_and_START_DO_TODO,
  SAVE_ACTIVE_TIMER_ELAPSED_TIME_and_STOP_DO_TODO,
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

export const saveActiveTimerElapsedTimeAndStartDoTodo = (id, activeTodoStartTime, activeTodoId) => {
  return {
    type: SAVE_ACTIVE_TIMER_ELAPSED_TIME_and_START_DO_TODO,
    id,
    activeTodoStartTime,
    activeTodoId
  }
}

export const saveActiveTimerElapsedTimeAndStopDoTodo = (id, activeTodoStartTime, activeTodoId) => {
  return {
    type: SAVE_ACTIVE_TIMER_ELAPSED_TIME_and_STOP_DO_TODO,
    id,
    activeTodoStartTime,
    activeTodoId
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