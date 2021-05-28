import { createSelector } from 'reselect'

const getNumAdd = state => state.numbers.numAdd
 
export const getNumAddSelector = createSelector(
  [ getNumAdd ],
  num => {
        console.log('Form getNumAdd called - This is supposed to be time expensive')
        return num
    }
)

const getNumRem = state => state.numbers.numRem
 
export const getNumRemSelector = createSelector(
  [ getNumRem ],
  num => {
        console.log('Form getNumRem called - This is supposed to be time expensive')
        return num
    }
)

const getList = (state, props) => state.elems.list[props.id]

export const getListDataSelector = createSelector(
    [ getList ],
    list => {
        console.log('Form getList called - This is supposed to be time expensive')
        return list.data
    }
)

export const makeGetListDataSelector = () => createSelector(
        [ getList ],
        list => {
            console.log('Form getList called - This is supposed to be time expensive')
            return list.data
        }
    )
