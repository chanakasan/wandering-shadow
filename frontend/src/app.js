import React, { useState } from "react"

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1>Hello, World!</h1>
      <hr />
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count-1)}>-</button>
      <button onClick={() => setCount(count+1)}>+</button>
    </>
  )
}

export default App
