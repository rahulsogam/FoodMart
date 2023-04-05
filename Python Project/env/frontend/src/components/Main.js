import React,{useEffect, useRef, useState} from 'react'
import Categories from './Categories'
import '../CSS/style.css'
import {useNavigate} from "react-router-dom"
import { TopNav } from './TopNav';
import Products from './Products';
import { Banner } from './Banner';
import AllProducts from './AllProducts';
import { Axios } from '../AxiosConfig';
import Home from './Home';
import { Login } from './Login';
function Main() {
  const inputRef = useRef(null);
  const navigate= useNavigate()
  const [cartCount,setCartCount]=useState(0)
  const [addedItem,setAddedItem]=useState()
  const [prodcutsCount,setProductsCount]=useState(0);
  let userdata = JSON.parse(localStorage.getItem('user'))
  console.log(userdata!=null);

    

//   const doLogin=()=>{
//     navigate("/login")
//   }

//   const searchProduct=()=>{
//     alert(inputRef.current.value);
//   }
  
//   console.log(addedItem)
//   useEffect(() => {
      
//       Axios.post("/GetCartDetails", {
//           Email: userdata.Email
//       }).then((res) => {
//           console.log(res.data.msg
//             )
//           setCartCount(res.data.msg)
//       })
//     },[])

  return (
    <div >
     {userdata!=null?(
        <Home/>
     ):( <Login/> )}
    
  </div>
  )
}

export default Main