import { useState } from 'react';
import Router from './Router/Router';
import Navbar from './Components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <div className='bg-slate-100  min-h-screen '>
    
    <Router/>
    
    </div>
   
    
 </>
      
  )
}

export default App