import React from 'react'
import FilterButton from '_containers/FilterButton'

const Footer = () => (
  <div className={'footer'}>
    <FilterButton filter="SHOW_ALL">
      All
    </FilterButton>
    <FilterButton filter="SHOW_UNCOMPLETED">
      Incomplete
    </FilterButton>
    <FilterButton filter="SHOW_COMPLETED">
      Completed
    </FilterButton>
    <FilterButton filter="SHOW_ACTIVE">
      Active
    </FilterButton>
  </div>
)

export default Footer
