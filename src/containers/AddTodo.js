import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '_actions'

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
          className={'form-input'}
          placeholder={'What need to be done?'}
        />
        <button type="submit" className={'btn submit'}>
          Add Todo
        </button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo