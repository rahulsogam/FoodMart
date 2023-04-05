import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { AddProduct } from '../components/AddProduct'
import { Cart } from '../components/Cart'
import { Dashboard } from '../components/Dashboard'
import Home from '../components/Home'
import { Login } from '../components/Login'
import Main from '../components/Main'
import { Orders } from '../components/Orders'
import { Register } from '../components/Register'
import { Users } from '../components/Users'
import { ViewProduct } from '../components/ViewProduct'


export const RoutePaths = () => {
  
  return (
    <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/prodcuts' element={<ViewProduct />}></Route>
        <Route path='/orders' element={<Orders />}></Route>
        <Route path='/Users' element={<Users />}></Route>
        <Route path='/Addprodcut' element={<AddProduct />}></Route>
        <Route path='/Cart' element={<Cart />}></Route>

    </Routes>
  )
}
