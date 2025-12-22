import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/custom/Hero'
import Header from './components/custom/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' h-screen  bg-cover bg-top flex flex-col' style={{backgroundImage: "url('/logo11.png')"}}>
        <Hero />
    </div>
  )
}

export default App