import React from 'react'
import Nav from './navbar.jsx'

import { Outlet } from 'react-router-dom'
import Footer from './footer.jsx'
function Layout() {
  return (
    <div>
      <Nav/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout