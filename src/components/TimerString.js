import React, { Component, PropTypes } from 'react'
import { isUndefined } from 'lodash'
import moment from 'moment'
import 'moment-duration-format'

class TimerString extends Component {
  constructor(props){
    super(props)
    this.state = this.propsToState(props)
  }
  componentDidMount() {
    if(this.props.isThisTodoActive) this.startTimer()
  }
  componentWillReceiveProps(newProps){
    this.setState(this.propsToState(newProps))
    newProps.isThisTodoActive ? this.startTimer() : this.stopTimer()
    newProps.deactivateTodo && newProps.deactivateTodo()
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
      <span> {timeString} </span>
    )
  }
}

TimerString.propTypes = {
  activeTodoStartTime: PropTypes.number.isRequired,
  deactivateTodo: PropTypes.func,
  elapsedTime: PropTypes.number.isRequired,
  isThisTodoActive: PropTypes.bool.isRequired
}

export default TimerString