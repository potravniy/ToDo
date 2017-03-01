import { max } from 'lodash'

export default (todos) => {
  if(todos.length === 0) return 'todo_0'

  const listId = todos.map(it => {
    return parseInt(it.id.split('_')[1])
  })
  
  return 'todo_'+ (max(listId) + 1)
}
