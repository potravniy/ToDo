import React, { PropTypes } from 'react'

const Link = ({ active, children, onClick }) => {

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

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link