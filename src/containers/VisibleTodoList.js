import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isNull, findIndex } from 'lodash'
import { toggleTodo, removeTodo } from '_actions'
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

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter,
      state.activeTodo.id
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleTodo: (id) => dispatch(toggleTodo(id)),
    removeTodo: (id) => dispatch(removeTodo(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
