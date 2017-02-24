import { combineReducers } from 'redux'
import todos from '_reducers/todos'
import visibilityFilter from '_reducers/visibilityFilter'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp