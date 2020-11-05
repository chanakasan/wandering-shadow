import createHoc from './create-hoc'
import createActions from './create-actions'
import createReducer from './create-reducer'
import createEpic from './create-epic'
import createApi from './create-api'
import L from 'lodash'

export default function createDux(resourceParams) {
  const { modelName, selectorName, apiBaseUrl, apiResourceUrl } = resourceParams
  const baseUrl = apiBaseUrl || ''
  const resourceUrl = apiResourceUrl || L.snakeCase(selectorName)

  const actions =  createActions(modelName)
  const hoc = createHoc(modelName, selectorName, actions.mapDispatchToProps)
  const reducer = createReducer(actions)
  const api = createApi(baseUrl, resourceUrl)
  const epic = createEpic(api, actions)

  return {
    actions,
    hoc,
    reducer,
    epic,
    api
  }
}
