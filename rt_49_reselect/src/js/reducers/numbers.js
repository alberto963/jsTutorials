const initialState = {
  numAdd:  0,
  numRem:  0,
  listIdAdd: 0,
  listIdRem: 0
}

const numbers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ADD':
      return { ...state, listIdAdd: action.payload.listId, numAdd: action.payload.num + 1 }
    case 'SET_REM':
      return { ...state, listIdRem: action.payload.listId, numRem: action.payload.num + 1 }
    default:
      return state
  }
}

export default numbers