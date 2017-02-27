import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isNull, findIndex } from 'lodash'

import { startDoTodo, stopDoTodo } from '_actions'
import VisibleTodoList from '_containers/VisibleTodoList'

const getStoredElapsedTime = (todos, activeTodoId) => {
  const index = findIndex(todos, t => t.id === activeTodoId )
  return todos[index].elapsedTime
}

class TodosTimer extends Component {
  constructor(props){
    super(props)
    this.propsToState = props => {
      if(isNull(props.activeTodo.id)){
        return {
          timer: null,
          onTimerClick: id => props.startDoTodo(id)
        }
      } else {
        return {
          timer: getStoredElapsedTime(props.todos, props.activeTodo.id),
          onTimerClick: id => {
            this.props.stopDoTodo(props.activeTodo.id, this.state.timer)
            if(id !== props.activeTodo.id){
              props.startDoTodo(id)
            }
          }
        }
      }
    }
    this.state = this.propsToState(props)
  }
  componentWillReceiveProps(newProps){
    const oldId = this.props.activeTodo.id
    const newId = newProps.activeTodo.id
    if(newId !== oldId){
      this.setState(this.propsToState(newProps))
      this.timerID && this.stopTimer()
      !isNull(newId) && this.startTimer(newId)
    }
  }
  startTimer = (id) => {
    const storedElapsedTime = getStoredElapsedTime(this.props.todos, id)
    this.timerID = setInterval(() => {
      this.setState({
        timer: storedElapsedTime + Date.now() - this.props.activeTodo.startTime
      })
    }, 1000)
  }
  stopTimer = () => {
    clearInterval(this.timerID)
    this.timerID = null
  }

  render() {
    return (
      <VisibleTodoList
        onTimerClick={this.state.onTimerClick}
        activeTodoId={this.props.activeTodo.id}
        timer={this.state.timer}
      />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    activeTodo: state.activeTodo
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    startDoTodo: (id) => dispatch(startDoTodo(id)),
    stopDoTodo: (id, time) => dispatch(stopDoTodo(id, time))
  }
}
TodosTimer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    elapsedTime: PropTypes.number.isRequired
  }).isRequired).isRequired,
  activeTodo: PropTypes.object.isRequired,
  startDoTodo: PropTypes.func.isRequired,
  stopDoTodo: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosTimer)
