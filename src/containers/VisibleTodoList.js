import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isNull, findIndex } from 'lodash'
import { toggleTodo, removeTodo, reorderTodos } from '_actions'
import TodoList from '_components/TodoList'
import { 
  SHOW_ACTIVE,
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_UNCOMPLETED
} from '_constants/visibilityStates'

const sortableContainerProps = visibilityFilter => {
  return {
    helperClass: 'onDragging',
    hideSortableGhost: true,
    isDragNDropDisabled: visibilityFilter !== SHOW_ALL,
    lockAxis: 'y',
    pressDelay: 0,
    useDragHandle: true
  }
}

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

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter,
      state.activeTodo.id
    ),
    ...sortableContainerProps(state.visibilityFilter)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSortEnd: ({oldIndex, newIndex}) => dispatch(reorderTodos(oldIndex, newIndex)),
    removeTodo: (id) => dispatch(removeTodo(id)),
    toggleTodo: (id) => dispatch(toggleTodo(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
