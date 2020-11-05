import resourceStoreCreator from '../../resource-store-creator'

const resourceParams = {
  modelName: 'BlogPost',
  selectorName: 'blogPosts'
  apiBaseUrl: 'https://wandering-shadow.herokuapp.com/api'
}
const dux = resourceStoreCreator(resourceParams)

export const blogPosts = dux.reducer
export const blogPostsEpic = dux.epic
export const blogPostsApi = dux.api
export const withBlogPosts = dux.hoc
