import { v1 as uuidv1 } from "uuid"

const initialState = {
  list: [{data: [{title: 'new ', id: uuidv1()}]},
         {data: [{title: 'new ', id: uuidv1()}]}]
}

const elems = (state = initialState, action) => {
  const data = action.payload && [...state.list[action.payload.listId].data]
  switch (action.type) {
    case 'ADD_ELEM':
      data.splice(action.payload.num, 0, action.payload.elem)
      const addList = state.list.map((l, i) => i === action.payload.listId ? {data} : l)
      return { ...state, list: addList }
    case 'REM_ELEM':
      data.splice(action.payload.num - 1, 1)
      const remList = state.list.map((l, i) => i === action.payload.listId ? {data} : l)
      return { ...state, list: remList }
    default:
      return state
  }
}

export default elems
