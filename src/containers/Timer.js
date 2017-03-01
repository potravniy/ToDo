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
    this.state = this.propsToState(props)
  }
  componentDidMount() {
    if(this.props.isActive) this.startTimer()
  }
  componentWillReceiveProps(newProps){
    this.setState(this.propsToState(newProps))
    if(newProps.stopTimer) this.props.stopDoTodo(newProps.id, this.state.timer)
    else newProps.isActive ? this.startTimer() : this.stopTimer()
  }
  componentWillUnmount() {
    this.stopTimer()
  }
  propsToState = props => ({
    timer: props.elapsedTime + (props.isActive ? Date.now() - props.startTime : 0)
  })
  onTimerClick = () => {
    if(this.props.isActive) {
      this.props.stopDoTodo(this.props.id, this.state.timer)
    } else if(!this.props.completed) {
      this.props.startDoTodo(this.props.id)
    }
  }
  timerID = null
  startTimer = () => {
    if(!isNull(this.timerID)) return
    this.timerID = setInterval(() => {
      this.setState({
        timer: this.props.elapsedTime + Date.now() - this.props.startTime
      })
    }, 1000)
  }
  stopTimer = () => {
    if(isNull(this.timerID)) return
    clearInterval(this.timerID)
    this.timerID = null
  }

  render() {
    const timeString = moment.duration(this.state.timer).format("h:mm:ss")

    return (
      <p
        className={'todo-counter'
          + (this.props.isActive ? ' run' : '')
          + (this.props.completed ? ' non-clicable' : '')}
        title={'Time spent for the task'}
        onClick={this.onTimerClick}
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

  const isThisTodoActive = state.activeTodo.id === ownProps.id
  
  const isOtherTodoActivating = isThisTodoActive
    && !isNull(state.activeTodo.nextActiveTodoId)
  
  const getCompleted = isThisTodoActive && ownProps.completed
  
  return {
    isActive: isThisTodoActive,
    startTime: state.activeTodo.startTime,
    stopTimer: isOtherTodoActivating || getCompleted
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startDoTodo: (id) => dispatch(startDoTodo(id)),
    stopDoTodo: (id, time) => dispatch(stopDoTodo(id, time))
  }
}

Timer.propTypes = {
  completed: PropTypes.bool.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  startDoTodo: PropTypes.func.isRequired,
  startTime: PropTypes.number.isRequired,
  stopDoTodo: PropTypes.func.isRequired,
  stopTimer: PropTypes.bool.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)
