import React, { PropTypes } from 'react'
import { SortableContainer } from 'react-sortable-hoc';

import Todo from '_components/Todo'

const TodoList = SortableContainer(({
  isDragNDropDisabled,
  removeTodo,
  todos,
  toggleTodo
}) => (
  <ul className={'todo-list'} >
    {todos.map((todo, index) =>
      <Todo
        key={todo.id}
        index={index}
        {...todo}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
        disabled={isDragNDropDisabled}
        isDragNDropDisabled={isDragNDropDisabled}
      />
    )}
  </ul>
))

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    elapsedTime: PropTypes.number.isRequired
  }).isRequired).isRequired,
  isDragNDropDisabled: PropTypes.bool.isRequired,
  removeTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired
}

export default TodoList