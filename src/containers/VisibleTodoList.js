import { connect } from 'react-redux'
import { toggleTodo, removeTodo } from '_actions'
import TodoList from '_components/TodoList'
import { 
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from '_constants/visibilityStates'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {

    case SHOW_ALL:
      return todos

    case SHOW_COMPLETED:
      return todos.filter(t => t.completed)

    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => null,
    toggleTodo: (id) => dispatch(toggleTodo(id)),
    removeTodo: (id) => dispatch(removeTodo(id))
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList