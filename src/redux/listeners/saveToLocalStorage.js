
let savedString = window.localStorage.ToDo
  ? window.localStorage.getItem("ToDo")
  : ''

function saveState(store) {
  const state = store.getState()
  const newString = JSON.stringify(state)
  if (savedString !== newString) {
    window.localStorage.setItem('ToDo', newString)
    savedString = newString
  }
}

export default function onStateChangeListener(store) {
  saveState(store)
  return store.subscribe(() => { saveState(store) })
}
