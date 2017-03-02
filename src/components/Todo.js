import React, { PropTypes } from 'react'
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

import TodoText from '_components/TodoText'
import PreTimer from '_containers/PreTimer'
import {
  CompletedIcon,
  UncompletedIcon,
  DeleteIcon
} from '_icons'

const Todo = SortableElement(({
  completed,
  elapsedTime,
  id,
  isDragNDropDisabled,
  removeTodo,
  text,
  toggleTodo
}) => (
  <li className={'todo-item'+ (completed ? ' completed' : '')} >

    <button
      className={'icon-btn btn-complete'}
      title={'Clik it when task has been done'}
      onClick={() => toggleTodo(id)}
    >
      {completed ? <CompletedIcon/> : <UncompletedIcon/>}
    </button>

    <TodoText
      text={text}
      isDragNDropDisabled={isDragNDropDisabled}
    />

    <PreTimer
      id={id}
      elapsedTime={elapsedTime}
      completed={completed}
    />

    <button
      className={'icon-btn btn-delete'}
      title={'Clik it to remove task'}
      onClick={() => removeTodo(id)}
    >
      <DeleteIcon/>
    </button>

  </li>
))

Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  removeTodo: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  toggleTodo: PropTypes.func.isRequired
}

export default Todo
