import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isNull, findIndex } from 'lodash'
import { toggleTodo, removeTodo, startDoTodo, stopDoTodo } from '_actions'
import TodoList from '_components/TodoList'
import { 
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_UNCOMPLETED,
  SHOW_ACTIVE
} from '_constants/visibilityStates'

const getVisibleTodos = (todos, filter, activeTodoId) => {
  switch (filter) {
    case SHOW_ALL:
      return todos
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case SHOW_UNCOMPLETED:
      return todos.filter(t => !t.completed)
    case SHOW_ACTIVE:
      return todos.filter(t => t.id === activeTodoId)
  }
}
const getStoredElapsedTime = (todos, activeTodoId) => {
  const index = findIndex(todos, t => t.id === activeTodoId )
  return todos[index].elapsedTime
}

class VisibleTodoList extends Component {
  constructor(props){
    super(props)
    this.propsToState = props => {
      let state
      if(isNull(props.activeTodo.id)){
        state = {
          elapsedTime: null,
          onTimerClick: id => props.startDoTodo(id)
        }
      } else {
        state = {
          elapsedTime: getStoredElapsedTime(props.todos, props.activeTodo.id),
          onTimerClick: id => {
            this.props.stopDoTodo(props.activeTodo.id, this.state.elapsedTime)
            if(id !== props.activeTodo.id){
              props.startDoTodo(id)
            }
          }
        }
      }
      return state
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
        elapsedTime: storedElapsedTime + Date.now() - this.props.activeTodo.startTime
      })
    }, 1000)
  }
  stopTimer = () => {
    clearInterval(this.timerID)
    this.timerID = null
  }

  render() {
    return (
      <TodoList
        todos={getVisibleTodos(
          this.props.todos,
          this.props.visibilityFilter,
          this.props.activeTodo.id
        )}
        onTimerClick={this.state.onTimerClick}
        toggleTodo={this.props.toggleTodo}
        removeTodo={this.props.removeTodo}
        activeTodoId={this.props.activeTodo.id}
        elapsedTime={this.state.elapsedTime}
      />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    activeTodo: state.activeTodo,
    visibilityFilter: state.visibilityFilter
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleTodo: (id) => dispatch(toggleTodo(id)),
    removeTodo: (id) => dispatch(removeTodo(id)),
    startDoTodo: (id) => dispatch(startDoTodo(id)),
    stopDoTodo: (id, time) => dispatch(stopDoTodo(id, time))
  }
}
VisibleTodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    elapsedTime: PropTypes.number.isRequired
  }).isRequired).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  activeTodo: PropTypes.object.isRequired,
  startDoTodo: PropTypes.func.isRequired,
  stopDoTodo: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList)
