import React , {useState} from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [userdetail, setuserdetail] = useState({
        username:"",
        email:"",
        password:""
    })
    const[Isloading , setisloading] = useState(false)

    const registerUser = async() =>{
        console.log(userdetail);
        try {
            setisloading(true)
             const response = await axios.post("http://localhost:8003/user/signup",userdetail)
             console.log(response);

             toast.success(response.data.message)
             setTimeout(() => {
                 navigate("/login")
             }, 3000);
             setisloading(false)
        } catch (error) {
            console.log(error.response.data.message);
            const errormessage = error?.response?.data?.message
            toast.error(errormessage)
             setisloading(false)
        }
        // axios.post("http://localhost:8003/user/signup",userdetail)
        // .then((res)=>{
        //   console.log(res);
          
        // }).catch((err)=>{
        //     console.log(err);
            
        // })
      
    }
  return (
    <div>
       <div className='w-50 mx-auto py-3 px-3 rounded-md'>
         <h1 className='text-center fs-3 text-dark'>Sign Up</h1>
        <input onChange={(e)=>setuserdetail({...userdetail, username:e.target.value})}  className='form-control mt-3' type="text" placeholder='Username' />
        <input onChange={(e)=> setuserdetail({...userdetail, email:e.target.value})} className='form-control mt-3' type="text" placeholder='Email' />
        <input onChange={(e)=> setuserdetail({...userdetail, password:e.target.value})} className='form-control mt-3' type="password" placeholder='Password' />
        <button onClick={registerUser} className='btn btn-dark mt-3'>{Isloading ? "Loading ..." : "Sign up"}</button>
       </div>
    </div>
  )
}

export default Signup