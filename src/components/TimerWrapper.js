import React, { Component, PropTypes } from 'react'

import TimerString from '_components/TimerString'
import {
  StartTimerIcon,
  StopTimerIcon
} from '_icons'

const TimerWrapper= (props) => {
  props.deactivateTodo && props.deactivateTodo()

    return (
      <p
        className={'todo-counter'
          + (props.isThisTodoActive ? ' run' : '')
          + (props.completed ? ' non-clicable' : '')}
        title={'Time spent for the task'}
        onClick={props.onTimerClick}
      >
        {
          props.completed ? null :
            props.isThisTodoActive ? <StopTimerIcon/> : <StartTimerIcon/>
        }
        <TimerString {...props} />
      </p>
    )

}

TimerWrapper.propTypes = {
  completed: PropTypes.bool.isRequired,
  deactivateTodo: PropTypes.func,
  isThisTodoActive: PropTypes.bool.isRequired,
  onTimerClick: PropTypes.func
}

export default TimerWrapper