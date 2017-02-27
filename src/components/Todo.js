import React, { PropTypes } from 'react'
import moment from 'moment'
import { CompletedIcon, UncompletedIcon, DeleteIcon } from '_icons'

const Todo = ({
  text,
  completed,
  onTimerClick,
  toggleTodo,
  removeTodo,
  elapsedTime
}) => {
  const elapsed = moment.duration(elapsedTime)
  const timeString = moment.utc(elapsedTime).format("HH:mm:ss")
  // console.log('Todo elapsedTime: ', timeString)
  return (
  <li className={'todo-item'+ (completed ? ' completed' : '')} >

    <button
      className={'icon-btn btn-complete'}
      title={'Clik it when task has been done'}
      onClick={toggleTodo}
    >
      {completed ? <CompletedIcon/> : <UncompletedIcon/>}
    </button>

    <p
      className={'todo-text'}
      title={'Click here to start timer'}
    >
      <span className="text">{text}</span>
    </p>

    <p
      className={'todo-counter'}
      title={'Time spent for the task'}
      onClick={onTimerClick}
    >
      {timeString}
    </p>

    <button
      className={'icon-btn btn-delete'}
      title={'Clik it to remove task'}
      onClick={removeTodo}
    >
      {<DeleteIcon/>}
    </button>

  </li>
)}

Todo.propTypes = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onTimerClick: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  elapsedTime: PropTypes.number.isRequired
}

export default Todo
