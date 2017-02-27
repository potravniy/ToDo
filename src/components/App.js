import React from 'react'
import Footer from '_components/Footer'
import AddTodo from '_containers/AddTodo'
import TodosTimer from '_containers/TodosTimer'

const App = () => (
  <div>
    <AddTodo />
    <TodosTimer />
    <Footer />
  </div>
)

export default App