
const savedString = window.localStorage.ToDo
  ? window.localStorage.getItem("ToDo")
  : ''

const getSavedState = () => {
  if(savedString) return JSON.parse(savedString)
  else return null
}

const initialState = getSavedState()

export default initialState