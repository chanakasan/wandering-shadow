import { createAction } from 'redux-actions'

export default function createResourceActions(resourceSlug) {
  const loadAllPending = createAction(`${resourceSlug}/LOAD_ALL/PENDING`)
  const loadAllSuccess = createAction(`${resourceSlug}/LOAD_ALL/SUCCESS`)
  const loadAllError = createAction(`${resourceSlug}/LOAD_ALL/ERROR`)

  const addItemPending = createAction(`${resourceSlug}/ADD/PENDING`)
  const addItemSuccess = createAction(`${resourceSlug}/ADD/SUCCESS`)
  const addItemError = createAction(`${resourceSlug}/ADD/ERROR`)

  const updateItemPending = createAction(`${resourceSlug}/UPDATE/PENDING`)
  const updateItemSuccess = createAction(`${resourceSlug}/UPDATE/SUCCESS`)
  const updateItemError = createAction(`${resourceSlug}/UPDATE_ERROR`)

  const deleteItemPending = createAction(`${resourceSlug}/DELETE_PENDING`)
  const deleteItemSuccess = createAction(`${resourceSlug}/DELETE_SUCCESS`)
  const deleteItemError = createAction(`${resourceSlug}/DELETE_ERROR`)

  const mapDispatchToProps = {
    loadAllPending,
    addItemPending,
    updateItemPending,
    deleteItemPending
  }

  return {
    loadAllPending,
    loadAllSuccess,
    loadAllError,
    addItemPending,
    addItemSuccess,
    addItemError,
    updateItemPending,
    updateItemSuccess,
    updateItemError,
    deleteItemPending,
    deleteItemSuccess,
    deleteItemError,
    mapDispatchToProps,
  }
}
