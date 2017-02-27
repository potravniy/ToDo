import { START_DO_TODO, STOP_DO_TODO } from '_constants/actions'

const initialState = {
  id: null,
  startTime: 0
}

const activeTodo = (state = initialState, action) => {

  switch (action.type) {

    case START_DO_TODO:
      return {
        id: action.id,
        startTime: parseInt(Date.now())
      }

    case STOP_DO_TODO:
      return initialState

    default:
      return state
  }
}

export default activeTodo