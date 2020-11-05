import React from 'react'

import { withBlogPosts } from '../stores/blog-posts'

const newPost = () => ({ title: `Post ${_.random(11,99)}` })

const Spinner = () => <h2>Loading...</h2>

const Grid = ({ blogPosts, blogPostsPending, addBlogPost, updateBlogPost, deleteBlogPost }) => blogPostsPending ? <Spinner/> : (
  <>
    <button onClick={() => addBlogPost(newPost())} type="button" className="btn btn-primary mb-2">Add Item</button>
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { _.map(blogPosts, (o) => (
          <tr key={o.id}>
            <td>{o.title}</td>
            <td>
              <button onClick={() => updateBlogPost(o)} type="button" className="btn btn-link">update</button>
              <button onClick={() => deleteBlogPost(o)} type="button" className="btn btn-link">delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)

export default withBlogPosts(Grid)
