import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios'
import './signup.css'

const Signup = () => {
  const [name, setName] =useState('')
  const [password, setPassword]=useState('')
  const [confirmpassword, setConfirmPassword]=useState('')
  const [email, setEmail] = useState('')
  const [signupmsg, setSignupMsg] = useState('')
  const [isSignup, setIsSignUp] = useState(false)
  const [pass, setPass] = useState('password')
  const [confirmpass, setConfirmPass] = useState('password')
  const [eye, setEye]= useState(faEye)
 
 
  const Axios = axios.create({
    baseURL:'/',
    headers:{
      'Content-Type':'application/json'
  },
  withCredentials:true, credentials:'include'
   })
  const ViewPassword = ()=>{
      if(pass === 'password'){
        if(password.length>=1){
          setPass('text')
          setEye(faEyeSlash)
        }
        else{
          setPass('password')
          // setEye(faEye);
        }
          
      }
      else{
        setPass('password')
        setEye(faEye);
      }
      
  }
  const ViewConfirmPassword = ()=>{
    if(confirmpass === 'password'){
      if(password.length>=1){
        setConfirmPass('text')
        setEye(faEyeSlash)
      }
      else{
        setConfirmPass('password')
        // setEye(faEye);
      }
        
    }
    else{
      setConfirmPass('password')
      setEye(faEye);
    }
    
}
    const InputValue = (e, direction) =>{
        if(direction==='password'){
          setPassword(e.target.value)
        }else if(direction==='name'){
        setName(e.target.value)
    } 
    else if(direction==='confirmpassword'){
      setConfirmPassword(e.target.value)
  }
    else{
      setEmail(e.target.value)
    }
  }
       const Submit = async(e) =>{
        e.preventDefault()
        if(confirmpassword === password){
        const signup = await axios.post('http://localhost:5000/user/create',{
            name,email,password
         })
         console.log(signup); 
        
           if(signup ===200) {
            setSignupMsg(signup.data)
            setIsSignUp(true)
          }
          else{
            setSignupMsg("user already exist")
            setIsSignUp(true)
          }


        }
    }
  return (
    <div className='signup'>
        <div className="signupContainer">
            <div className="signupItem">
              <div className="icon">
                <span className='signupTitle'>Sign Up</span>
                <FontAwesomeIcon icon={faUserPlus} className='iconStyle'/>
                </div>
                <form className="form">
                     <input type="text" className="input" onChange={(e)=>{InputValue(e,'name')}}
                        placeholder='Name' value={name}/>
                     <input type="email" className="input" onChange={(e)=>{InputValue(e,'email')}}
                        placeholder='Email' value={email}/>
                      <div className="password">
             <input type={pass} className="input" id='password' onChange={(e)=>{InputValue(e,'password')}}
                  placeholder='Password' value={password}/>
              <FontAwesomeIcon icon={eye} className='ico' onClick={ViewPassword}/></div>
              <div className="password">
             <input type={confirmpass} className="input" id='password' onChange={(e)=>{InputValue(e,'confirmpassword')}}
                  placeholder='Confirm Password' value={confirmpassword}/>
              <FontAwesomeIcon icon={eye} className='ico' onClick={ViewConfirmPassword}/></div>
             
                     <button disabled={email ==='' && password ==='' } className='signupBtn' onClick={(e)=>Submit(e)}>Submit</button>
                </form>
                  </div>
        </div>
        <div>{isSignup?<>{signupmsg} </>:<></> } </div>
    </div>
  )
}

export default Signup