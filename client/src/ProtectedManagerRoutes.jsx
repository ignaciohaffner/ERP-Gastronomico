import React from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedManagerRoutes = () => {
    const { loading, isAuthenticated, role } = useAuth()
    console.log(loading, isAuthenticated, role)

    if (loading) return <h1> Carregando... </h1>
    if (!loading && !isAuthenticated || role === 'staff') {
        return <Navigate to='/login' replace />

    }
    return <Outlet />
}

export default ProtectedManagerRoutes