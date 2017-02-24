import React, { PropTypes } from 'react'
import Todo from '_components/Todo'

const TodoList = ({ todos, onTodoClick, toggleTodo, removeTodo }) => (
  <ul className={'todo-list'} >
    {todos.map(todo =>
      <Todo
        key={todo.id}
        onTodoClick={() => onTodoClick(todo.id)}
        toggleTodo={() => toggleTodo(todo.id)}
        removeTodo={() => removeTodo(todo.id)}
        {...todo}
      />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
}

export default TodoList