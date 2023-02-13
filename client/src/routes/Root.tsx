import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../Root.css'
import Post from '../components/Post';

function Root() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Post />
    </div>
  )
}

export default Root
