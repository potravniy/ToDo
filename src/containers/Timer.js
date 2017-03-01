import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isUndefined } from 'lodash'
import moment from 'moment'
import 'moment-duration-format'

import { startDoTodo, stopDoTodo, saveActiveTimerElapsedTime } from '_actions'
import {
  StartTimerIcon,
  StopTimerIcon
} from '_icons'

class Timer extends Component {
  constructor(props){
    super(props)
    this.state = this.propsToState(props)
  }
  componentDidMount() {
    if(this.props.isThisTodoActive) this.startTimer()
  }
  componentWillReceiveProps(newProps){
    this.setState(this.propsToState(newProps))
    newProps.deactivateTodo && newProps.deactivateTodo()
    newProps.isThisTodoActive ? this.startTimer() : this.stopTimer()
  }
  componentWillUnmount() {
    this.stopTimer()
  }
  propsToState = props => ({
    timer: props.elapsedTime
      + (props.isThisTodoActive ? Date.now() - props.activeTodoStartTime : 0)
  })
  startTimer = () => {
    if(!isUndefined(this.timerID)) return
    this.timerID = setInterval(() => {
      this.setState({
        timer: this.props.elapsedTime + Date.now() - this.props.activeTodoStartTime
      })
    }, 1000)
  }
  stopTimer = () => {
    if(isUndefined(this.timerID)) return
    clearInterval(this.timerID)
    this.timerID = undefined
  }

  render() {
    const timeString = moment.duration(this.state.timer).format("h:mm:ss")

    return (
      <p
        className={'todo-counter'
          + (this.props.isThisTodoActive ? ' run' : '')
          + (this.props.completed ? ' non-clicable' : '')}
        title={'Time spent for the task'}
        onClick={this.props.onTimerClick}
      >
        {
          this.props.completed ? null :
            this.props.isThisTodoActive ? <StopTimerIcon/> : <StartTimerIcon/>
        }
        {timeString}
      </p>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const isThisTodoActive = state.activeTodo.id === ownProps.id
  const getCompleted = isThisTodoActive && ownProps.completed
  
  return {
    activeTodoId: state.activeTodo.id,
    activeTodoStartTime: state.activeTodo.startTime,
    getCompleted: getCompleted,
    isThisTodoActive: isThisTodoActive,
    isThisTodoCompleted: ownProps.completed,
    thisTodoId: ownProps.id
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    activeTodoId,
    activeTodoStartTime,
    getCompleted,
    isThisTodoActive,
    isThisTodoCompleted,
    thisTodoId
  } = stateProps
  const { dispatch } = dispatchProps
  const activateTodo = () => {
    dispatch(saveActiveTimerElapsedTime(activeTodoId, activeTodoStartTime))
    dispatch(startDoTodo(thisTodoId))
  }
  const deactivateTodo = () => {
    dispatch(saveActiveTimerElapsedTime(activeTodoId, activeTodoStartTime))
    dispatch(stopDoTodo(thisTodoId))
  }
  const onTimerClick = isThisTodoCompleted
    ? null
    : isThisTodoActive
      ? deactivateTodo
      : activateTodo

  return {
    activeTodoStartTime,
    isThisTodoActive,
    onTimerClick,
    deactivateTodo: getCompleted ? deactivateTodo : null,
    ...ownProps
  }
}

Timer.propTypes = {
  activeTodoStartTime: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  deactivateTodo: PropTypes.func,
  elapsedTime: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isThisTodoActive: PropTypes.bool.isRequired,
  onTimerClick: PropTypes.func
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(Timer)
