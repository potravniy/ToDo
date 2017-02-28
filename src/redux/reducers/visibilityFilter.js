import initialState from '_redux/initialState'
import { SET_VISIBILITY_FILTER } from '_constants/actions'
import { SHOW_ALL } from '_constants/visibilityStates'

const init = (initialState && initialState.visibilityFilter) || SHOW_ALL

const visibilityFilter = (state = init, action) => {
  switch (action.type) {

    case SET_VISIBILITY_FILTER:
      return action.filter

    default:
      return state
  }
}

export default visibilityFilter