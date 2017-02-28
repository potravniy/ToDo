import React, { PropTypes } from 'react'
import Todo from '_components/Todo'

const TodoList = ({ todos, toggleTodo, removeTodo }) => (
  <ul className={'todo-list'} >
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    elapsedTime: PropTypes.number.isRequired
  }).isRequired).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
}

export default TodoList