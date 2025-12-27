import { useState } from 'react'
import './App.css'
import Hero from './components/custom/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-[calc(100svh-4rem)]  bg-cover bg-center' style={{backgroundImage: "url('/background2.png')"}}>
        <Hero />
    </div>
  )
}

export default App