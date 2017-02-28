import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isNull } from 'lodash'
import moment from 'moment'
import 'moment-duration-format'

import { startDoTodo, stopDoTodo } from '_actions'
import {
  StartTimerIcon,
  StopTimerIcon
} from '_icons'

class Timer extends Component {
  constructor(props){
    super(props)
    this.propsToState = props => {
      if(props.isActive){
        return {
          timer: props.elapsedTime + Date.now() - props.startTime,
          onTimerClick: () => {
            this.props.stopDoTodo(props.id, this.state.timer)
          }
        }
      } else if(props.completed){
        return {
          timer: props.elapsedTime,
          onTimerClick: null
        }
      } else {
        return {
          timer: props.elapsedTime,
          onTimerClick: () => props.startDoTodo(props.id)
        }
      }
    }
    this.state = this.propsToState(props)
  }
  componentDidMount() {
    if(this.props.isActive && !this.timerID){
      this.startTimer()
    }
  }
  componentWillReceiveProps(newProps){
    this.setState(this.propsToState(newProps))
    if(newProps.stopTimer){
      this.props.stopDoTodo(newProps.id, this.state.timer)
    } else if(newProps.isActive && !this.timerID){
      this.startTimer()
    } else if(!newProps.isActive && this.timerID){
      this.stopTimer()
    }
  }
  componentWillUnmount() {
    this.stopTimer()
  }
  startTimer = () => {
    this.timerID = setInterval(() => {
      this.setState({
        timer: this.props.elapsedTime + Date.now() - this.props.startTime
      })
    }, 1000)
  }
  stopTimer = () => {
    clearInterval(this.timerID)
    this.timerID = null
  }

  render() {
    const elapsed = moment.duration(this.state.timer)
    const timeString = elapsed.asHours() < 1
                     ? elapsed.format("m:ss")
                     : elapsed.format("h[h] mm[m]")
    return (
      <p
        className={'todo-counter'
          + (this.props.isActive ? ' run' : '')
          + (this.props.completed ? ' non-clicable' : '')}
        title={'Time spent for the task'}
        onClick={this.state.onTimerClick}
      >
        {
          this.props.completed ? null :
            this.props.isActive ? <StopTimerIcon/> : <StartTimerIcon/>
        }
        {timeString}
      </p>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const isActive = state.activeTodo.id === ownProps.id
  const becomeOtherTodoActive = isActive
    && !isNull(state.activeTodo.nextActiveTodoId)
    && state.activeTodo.nextActiveTodoId !== ownProps.id
  const getCompleted = isActive && ownProps.completed
  return {
    isActive: isActive,
    stopTimer: becomeOtherTodoActive || getCompleted,
    startTime: state.activeTodo.startTime
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    startDoTodo: (id) => dispatch(startDoTodo(id)),
    stopDoTodo: (id, time) => dispatch(stopDoTodo(id, time))
  }
}

Timer.propTypes = {
  id: PropTypes.string.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  stopTimer: PropTypes.bool.isRequired,
  startTime: PropTypes.number.isRequired,
  startDoTodo: PropTypes.func.isRequired,
  stopDoTodo: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)
