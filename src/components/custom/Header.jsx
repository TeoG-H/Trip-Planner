import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='h-16 bg-[#FCF7F1] 
 p-3 shadow-sm flex justify-between items-center px-5'>
        <img src='/logo3.svg' className="h-8 w-auto" />
        <div>
            <Button>Sig In</Button>
        </div>
    </div>
  )
}

export default Header