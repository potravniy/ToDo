import { combineReducers } from 'redux'
import activeTodo from '_reducers/activeTodo'
import todos from '_reducers/todos'
import visibilityFilter from '_reducers/visibilityFilter'

const todoApp = combineReducers({
  activeTodo,
  todos,
  visibilityFilter
})

export default todoApp