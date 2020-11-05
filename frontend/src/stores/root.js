import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable';

import { blogPosts, blogPostsEpic } from './blog-posts'

export const rootReducer = combineReducers({
  blogPosts,
})

export const rootEpic = combineEpics(
  blogPostsEpic,
)
