import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const isLogin = localStorage.getItem("token") == null
    return isLogin ? <Navigate to={"/login"} />:children 
}
