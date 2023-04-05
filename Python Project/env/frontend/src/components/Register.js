import React,{useState} from 'react'
import '../CSS/register.css'
import validator from 'validator'
import { Axios } from '../AxiosConfig'
import {toast} from'react-toastify'
import {useNavigate} from "react-router-dom"

export const Register = () => {
    const [Name,setName]=useState('')
    const [Address,setAddress]=useState('')
    const [Email,setEmail]=useState('')
    const [Phone,setPhone]=useState('')
    const [Password,setPassword]=useState('')
    const [ConfirmPwd,setConfirmpwd]=useState('')
    const[error,setError]=useState(false)
    const navigate= useNavigate()

    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PHONE_REGEX = new RegExp(/"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"/gmi);    
    
    const addUser=()=>{
        if(Name.length===0 || Address.length===0 ||validEmail()!=true || validPhone()!=true || validatePwd()!=true && confirmPass()!=true )
        {
            setError(true)
        }
        else if(validEmail()==true && validPhone()==true && validatePwd()==true && confirmPass()==true)
        {
            console.log('HERE')
            Axios.post("/addUser",
            {  User_Name: Name,
                Email: Email,
                Address:Address,
                Password:Password,
                Phone:Phone,
                Role:'User'
             }).then((res) => {
                alert(res.data=='User added successfully.');
                if(res.data=='User added successfully.Please proceed to login.')
                {
                    navigate("/login")
                }
            })
        }
    }
    
    const validEmail = (e) => {

        if (Email.length === 0) {
            return "Email can not be null."
        }
        else if (!regEmail.test(Email)) {
            return "Please Enter valid Email"
        }else{
            return true
        }
    }
    const validPhone=(e)=>{
        if(Phone.length===0 || Phone.length<9 ){
            return "Phone Number can not be less than 9"
        }else if(Phone.length>9){
            return "Phone Number can not be More than 9"
        }else{return true}
    }
    const confirmPass=(e)=>{
        console.log(ConfirmPwd==Password)
        if(!(ConfirmPwd==Password)){
            return 'Password does not match'
        }else{return true}
    }

    function validatePwd (){
        
        if (Password.length===0) {
            return'Please enter the password'
          }
        else if (!(validator.isStrongPassword(Password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          }))) {
            return 'Password is weak'
          } else{return true} 
        }
      

  return (
    <div class="register">
    <div class="container1">
    <div class="title">Registration</div>
    <div class="content">
      <form>
        <div class="user-details">
          <div class="input-box">
            <span class="details">Full Name</span>
            <input type="text" placeholder="Enter your name"  onChange={(e)=>setName(e.target.value)} />
            {error&&Name.length==0?<span class="error">Username can not be null.</span>:""}
          </div>
          <div class="input-box">
            <span class="details">Address</span>
            <input type="text" placeholder="Enter your Address" onChange={(e)=>setAddress(e.target.value)}/>
            {error&&Address.length==0?<span class="error">Address can not be null.</span>:""}
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input type="email" placeholder="abc@xyz.com" onChange={(e)=>setEmail(e.target.value)}  />
            {error?<span class="error">{validEmail()}</span>:""}
          </div>
          <div class="input-box">
            <span class="details">Phone Number</span>
            <input max={9} type="number" placeholder='Contact No' onChange={(e)=>setPhone(e.target.value)} />
            {error?<span class="error">{validPhone()}</span>:""}
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
            {error?<span class="error">{validatePwd()}</span>:""}
          </div>
          <div class="input-box">
            <span class="details">Confirm Password</span>
            <input type="password" placeholder="Confirm your password" onChange={(e)=>setConfirmpwd(e.target.value)} />
            {error?<span class="error">{confirmPass()}</span>:""}
          </div>
        </div>
        <div class="button">
          <input type="button" value="Register" onClick={addUser} />
        </div>
      </form>
    </div>
    </div>
    </div>
  )
}
