import React from 'react'
import FilterLink from '_containers/FilterLink'

const Footer = () => (
  <div className={'footer'}>
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    <FilterLink filter="SHOW_UNCOMPLETED">
      Incomplete
    </FilterLink>
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
  </div>
)

export default Footer
