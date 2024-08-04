import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LoginContext } from '../ContextProvider/LoginProvider'
import Header from './Header'

const ProtectedRoute = () => {
    const role=localStorage.getItem("role");
    return role === "admin" ?<Outlet />:<Navigate to="/Login"/>
}

export default ProtectedRoute
