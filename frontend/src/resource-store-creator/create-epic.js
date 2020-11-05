import { ofType } from 'redux-observable'
import { EMPTY } from 'rxjs'
import { map, mergeMap, tap, catchError } from 'rxjs/operators'
import { combineEpics } from 'redux-observable'

export default function(resource, actions) {
  const loadAllItems = action$ =>
    action$.pipe(
      ofType(actions.loadAllPending().type),
      mergeMap(() =>
        resource.fetchAll().pipe(
          tap(data => console.log('[DEBUG] loadAll =', data)),
          map(data => actions.loadAllSuccess(data))
        )
      )
    )

  const addOrUpdateItem = action$ => {
    return action$.pipe(
      ofType(actions.addItemPending().type, actions.updateItemPending().type),
      mergeMap(action =>
        (action.payload.item.id
          ? resource.update(action.payload.item)
          : resource.create(action.payload.item)
        ).pipe(
          tap(data => console.log('[DEBUG] addOrUpdateItem =', data)),
          map(data => actions.updateItemSuccess(data)),
          tap(() => {
            console.log("[DEBUG] 'onSuccess' =", 'onSuccess')
            action.payload.onSuccess()
          }),
          catchError(error => {
            console.log("[DEBUG] 'onError' =", 'onError')
            console.log('[DEBUG] EPIC_ERROR =', error)
            action.payload.onError(error)
            return EMPTY
          })
        )
      )
    )
  }

  const deleteItem = action$ =>
    action$.pipe(
      ofType(actions.deleteItemPending().type),
      mergeMap(action =>
        resource.destroy(action.payload.id).pipe(
          map(() => actions.deleteItemSuccess(action.payload)),
          tap(() => console.log("[DEBUG] 'DELETED' =", 'DELETED')),
          catchError(() => {
            toast.error('Error: failed to delete.')
            return EMPTY
          })
        )
      )
    )

  return combineEpics(
    loadAllItems,
    addOrUpdateItem,
    deleteItem,
  )
}
