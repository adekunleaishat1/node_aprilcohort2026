import React,{useState} from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
     const [userdetail, setuserdetail] = useState({
            email:"",
            password:""
        })

        const[Isloading , setisloading] = useState(false)

    const loginUser = async() =>{
        console.log(userdetail);
        try {
            setisloading(true)
             const response = await axios.post("http://localhost:8003/user/login",userdetail)
             console.log(response);

             toast.success(response?.data?.message)
             setisloading(false)
        } catch (error) {
            console.log(error.response);
            
            console.log(error?.response?.data?.message);
            const errormessage = error?.response?.data?.message
            toast.error(errormessage)
             setisloading(false)
        }
      
    }
  return (
    <div>
        <div className='w-50 mx-auto py-3 px-3 rounded-md'>
         <h1 className='text-center fs-3 text-dark'>Login</h1>
        <input onChange={(e)=> setuserdetail({...userdetail, email:e.target.value})} className='form-control mt-3' type="text" placeholder='Email' />
        <input onChange={(e)=> setuserdetail({...userdetail, password:e.target.value})} className='form-control mt-3' type="password" placeholder='Password' />
        <button onClick={loginUser} className='btn btn-dark mt-3'>{Isloading ? "Loading ..." : "Login"}</button>
       </div>
    </div>
  )
}

export default Login