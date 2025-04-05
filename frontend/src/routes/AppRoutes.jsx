import React from 'react'
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import { Home } from '../screens/Home.jsx'
import Project from '../screens/Project.jsx'
const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/project" element={<Project/>} />
        </Routes>
    </Router>
  )
}

export default AppRoutes