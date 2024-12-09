import React from 'react'
import ANav from './Anav.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './footer.jsx'
function ALayout() {
  return (
    <div>
      <ANav/>
      
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default ALayout