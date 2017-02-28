import React, { PropTypes } from 'react'
import { SortableHandle } from 'react-sortable-hoc';

const TodoText = SortableHandle(({ text, isDragNDropDisabled }) => (
  <p
    className={'todo-text'}
    title={isDragNDropDisabled
      ? 'It is your task description' : 'You can move it to other place'}
    style={isDragNDropDisabled ? {'cursor': 'auto'} : {'cursor': 'row-resize'}}
  >
    <span className="text">{text}</span>
  </p>
))

TodoText.propTypes = {
  text: PropTypes.string.isRequired,
  isDragNDropDisabled: PropTypes.bool.isRequired
}

export default TodoText