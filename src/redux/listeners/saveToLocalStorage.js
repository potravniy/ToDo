
let savedString = window.localStorage.ToDo
  ? window.localStorage.getItem("ToDo")
  : ''

function saveState(store) {
  const newString = JSON.stringify(store.getState())
  if (savedString !== newString) {
    window.localStorage.setItem('ToDo', newString)
    savedString = newString
  }
}

export default function onStateChangeListener(store) {
  return store.subscribe(() => { saveState(store) })
}
