import React from 'react'
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import { Home } from '../screens/Home'
const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    </Router>
  )
}

export default AppRoutes