import React from 'react'
import Footer from '_components/Footer'
import AddTodo from '_containers/AddTodo'
import VisibleTodoList from '_containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App