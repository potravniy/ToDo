import { connect } from 'react-redux'

import TimerWrapper from '_components/TimerWrapper'
import { startDoTodo, stopDoTodo, saveActiveTimerElapsedTime } from '_actions'

const mapStateToProps = (state, ownProps) => {
  const isThisTodoActive = state.activeTodo.id === ownProps.id
  return {
    activeTodoId: state.activeTodo.id,
    activeTodoStartTime: state.activeTodo.startTime,
    getCompleted: isThisTodoActive && ownProps.completed,
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
    elapsedTime: ownProps.elapsedTime,
    completed: ownProps.completed
  }
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(TimerWrapper)
