import React, { PropTypes } from 'react'
import Todo from '_components/Todo'

const TodoList = ({
  todos,
  onTimerClick,
  toggleTodo,
  removeTodo,
  activeTodoId,
  timer
}) => (
  <ul className={'todo-list'} >
    {todos.map(todo =>
      <Todo
        key={todo.id}
        onTimerClick={() => onTimerClick(todo.id)}
        toggleTodo={() => toggleTodo(todo.id)}
        removeTodo={() => removeTodo(todo.id)}
        {...todo}
        elapsedTime={ activeTodoId === todo.id ? timer : todo.elapsedTime }
        active={ activeTodoId === todo.id ? true : false }
      />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    elapsedTime: PropTypes.number.isRequired
  }).isRequired).isRequired,
  onTimerClick: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  activeTodoId: PropTypes.number,
  timer: PropTypes.number
}

export default TodoList