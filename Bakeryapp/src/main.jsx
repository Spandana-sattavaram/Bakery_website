import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DeliveryPage from './order.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider,Routes,Route } from 'react-router-dom'
 import Layout from './Layout.jsx'
import {Cake,CakeDetail} from './Cakes.jsx'
import ALayout from './Alayout.jsx'
import Profile from './Profile.jsx'
import Items from './Items.jsx'
import DeliveryInfo from './Delivery.jsx'
import Login from './Login.jsx'
import Role from './Role.jsx'
import HomePage from './homepage.jsx';
import Admin from './Alogin.jsx'
import AOrder from './aOrder.jsx'
import AReview from './aOrdered.jsx'
import Customer from './Customers.jsx'
import Aprod from './Aprod.jsx'
import AddNew from './AddNew.jsx'
import Sign from './SignUp.jsx'
import CartPage from './CartPage.jsx'
import {Croissants,CroissantDetail} from './Croissant.jsx'
import { Cookies, CookieDetail } from './Cookies.jsx'
import { Doughnuts, DoughnutDetail } from './Doughnut.jsx'
import ReviewPage from './Review.jsx'
import Class from './OrdersHistory.jsx'
const router=createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={<Login/>}/>
      <Route path='' element={<Role/>}/>
      <Route path='/sign' element={<Sign/>}/>
      <Route path='/admin' element={<Admin/>}/>

      <Route path='/' element={<Layout/>}>
      <Route path='/Orders' element={<Class/>}/>
      <Route path='/items' element={<Items/>}/>
      <Route path='/ord' element={<DeliveryPage/>}/>
      <Route path='cakes' element={<Cake/>}/>
      <Route path="/cakes/:id" element={<CakeDetail />} />
      <Route path='croissants' element={<Croissants/>}/>
      <Route path='/croissants/:id' element={<CroissantDetail/>}/>
      <Route path='cookies' element={<Cookies/>}/>
      <Route path='/cookies/:id' element={<CookieDetail/>}/>
      <Route path='doughnut' element={<Doughnuts/>}/>
      <Route path='/doughnut/:id' element={<DoughnutDetail/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/review' element={<ReviewPage/>}/>
      <Route path='/delivery' element={<DeliveryInfo/>}/>
      </Route>

      <Route path='/' element={<ALayout/>}>
      <Route path='/customer' element={<Customer/>}/>
      <Route path='/aprod' element={<Aprod/>}/>
      <Route path='/addNew' element={<AddNew/>}/>
      <Route path='/aOrder' element={<AOrder/>}/>
      <Route path='/aOrdered' element={<AReview/>}/>
      </Route>
    </>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>   
    <RouterProvider router={router}/>   
  </StrictMode>,
)