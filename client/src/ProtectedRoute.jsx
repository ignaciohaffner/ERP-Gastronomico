import React from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoute = () => {
    const { loading, user, isAuthenticated, role } = useAuth()
    console.log(loading, isAuthenticated)

    if (loading) return <h1> Carregando... </h1>
    if (!loading && !isAuthenticated) {
        return <Navigate to='/login' replace />

    }
    return <Outlet />
}

export default ProtectedRoute