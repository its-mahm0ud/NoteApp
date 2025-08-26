import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedAuth({ children }) {
    const isLogin = localStorage.getItem("token") == null
    return isLogin ? children : <Navigate to={"/"} />
}


