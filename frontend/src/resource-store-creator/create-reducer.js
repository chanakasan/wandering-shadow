import { handleActions, combineActions } from 'redux-actions'
import _ from 'lodash'

export default function createResourceReducer(resourceActions) {
  const {
    loadAllPending,
    loadAllSuccess,
    addItemSuccess,
    updateItemSuccess,
    deleteItemSuccess,
  } = resourceActions
  
  const initialState = {
    pending: false,
    items: []
  }

  const addToOrUpdateList = (items, newItem) => {
    const newList = _.clone(items)
    const index = _.findIndex(newList, ['id', newItem.id])
    if (index === -1) {
      newList.push(newItem)
    } else {
      newList.splice(index, 1, newItem)
    }
    return sortList(newList)
  }

  const removeFromList = (items, itemToDelete) =>
    _.filter(items, i => i.id !== itemToDelete.id)

  const sortList = items => _.sortBy(items, ['sortIndex'])

  return handleActions(
    {
      [loadAllPending]: state => ({
        ...state,
        pending: true
      }),
      [loadAllSuccess]: (state, action) => ({
        ...state,
        pending: false,
        items: action.payload
      }),
      [combineActions(addItemSuccess, updateItemSuccess)]: (state, action) => ({
        ...state,
        items: addToOrUpdateList(state.items, action.payload)
      }),
      [deleteItemSuccess]: (state, action) => ({
        ...state,
        items: removeFromList(state.items, action.payload)
      })
    },
    initialState
  )
}
