import React, { PropTypes } from 'react'

const Button = ({ active, children, onClick }) => {

  return (
    <button className={active ? 'btn active' : 'btn'}
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button