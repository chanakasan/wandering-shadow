import Axios from 'axios-observable'
import { map } from 'rxjs/operators'

export default function(modelName, baseUrl, resourceUrl) {
  const modelSlug = _.snakeCase(modelName)
  const camelToSnakeCase = str => str
  const snakeToCamelCase = str => str
  const resourceBaseUrl = `${baseUrl}/${resourceUrl}`

  function fetchAll() {
    return Axios.get(resourceBaseUrl).pipe(
      map(res => snakeToCamelCase(res.data))
    )
  }

  function create(params) {
    return Axios.post(resourceBaseUrl,
      camelToSnakeCase({ [modelSlug]: params })
    ).pipe(map(res => snakeToCamelCase(res.data)))
  }

  function update(params) {
    return Axios.put(
      `${resourceBaseUrl}/${params.id}`,
      camelToSnakeCase({
        [modelSlug]: params
      })
    ).pipe(map(res => snakeToCamelCase(res.data)))
  }

  function destroy(id) {
    return Axios.delete(`${resourceBaseUrl}/${id}`)
  }

  return {
    fetchAll,
    create,
    update,
    destroy,
  }
}
