import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import {ToastContainer} from "react-toastify"
import Login from './components/Login'

const App = () => {
  return (
    <div>
       <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
       </Routes>
       <ToastContainer/>
    </div>
  )
}

export default App