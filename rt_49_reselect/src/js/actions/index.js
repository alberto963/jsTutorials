export const addElem = (listId, num, elem) => ({ type: "ADD_ELEM", payload: {listId, num, elem} })
export const remElem = (listId, num) => ({ type: "REM_ELEM", payload: {listId,num} })
export const setAdd = (listId, num) => ({ type: "SET_ADD", payload: {listId, num} })
export const setRem = (listId, num) => ({ type: "SET_REM", payload: {listId, num} })
