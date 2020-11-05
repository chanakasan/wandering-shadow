import React, { useState } from "react"
import BlogGrid from './components/blog-grid'

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <div className="container p-5">
      <h1>Hello, World!</h1>
      <hr />
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count-1)}>-</button>
      <button onClick={() => setCount(count+1)}>+</button>
      <hr />
      <BlogGrid />
    </div>
  )
}

export default App
