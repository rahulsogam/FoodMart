import React, { useState } from 'react'
import {  Link, Navigate} from 'react-router-dom'
import '../CSS/login.css'
import { Axios } from '../AxiosConfig'
import {useNavigate} from "react-router-dom"

export const Login = () => {
const[User,setUser]=useState('')
const[Password,setPassword]=useState('')
const Navigate= useNavigate()
  const Login=()=>{
    alert("here")
    Axios.post("/verifyUser",
            {  Email: User,
                pwd: Password,
             }).then((res) => {
              console.log(res)
                if(res.data.msg!=='Success'){
                    alert(res.data.msg)
                }
                else{
                  passFlow(res.data.userInfo)
                }
                // passFlow(res)
                // if(res.data=='User added successfully.Please proceed to login.')
                // {
                //     navigate("/login")
                // }
            })
  }

  function passFlow(res){
    alert(res.Role)
    localStorage.setItem('user', JSON.stringify(res))
    // let userData=JSON.parse(localStorage.getItem('user'))
    // console.log(userData.Address)
    if(res.Role==='User'){
      Navigate('/')
    }else if (res.Role==='Owner'){
      Navigate('/Dashboard')
    }
  }
  return (
    <div class="login">
    <div class="container2">
    <div class="title">Login</div>
    <div class="content1">
      <form>
        <div class="user-details1">
          <div class="input-box1">
            <span class="details1">Email/Username</span>
            <input type="text" placeholder="Enter your Email Id"  onChange={(e)=>setUser(e.target.value)} />
            {/* {error&&Name.length==0?<span class="error">Username can not be null.</span>:""} */}
          </div>
          <div class="input-box1">
            <span class="details1">Password</span>
            <input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
            {/* {error?<span class="error">{validatePwd()}</span>:""} */}
          </div>
          <div class="input-box1 link">
            
              <Link class='link' to="/register">New here ? Please click here to Register</Link>
            
            {/* {error?<span class="error">{validatePwd()}</span>:""} */}
          </div>
        </div>
        <div class="button">
          <input type="button" value="Login" onClick={Login} />
        </div>
      </form>
    </div>
    </div>
    </div>

  )
}
