import React, { PropTypes } from 'react'

import Timer from '_containers/Timer'
import {
  CompletedIcon,
  UncompletedIcon,
  DeleteIcon
} from '_icons'

const Todo = ({
  id,
  text,
  completed,
  elapsedTime,
  toggleTodo,
  removeTodo
}) => (
  <li className={'todo-item'+ (completed ? ' completed' : '')} >

    <button
      className={'icon-btn btn-complete'}
      title={'Clik it when task has been done'}
      onClick={() => toggleTodo(id)}
    >
      {completed ? <CompletedIcon/> : <UncompletedIcon/>}
    </button>

    <p
      className={'todo-text'}
      title={'Click here to start timer'}
    >
      <span className="text">{text}</span>
    </p>

    <Timer
      id={id}
      elapsedTime={elapsedTime}
      completed={completed}
    />

    <button
      className={'icon-btn btn-delete'}
      title={'Clik it to remove task'}
      onClick={() => removeTodo(id)}
    >
      {<DeleteIcon/>}
    </button>

  </li>
)

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
}

export default Todo
