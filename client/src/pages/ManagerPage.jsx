import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const ManagerPage = () => {

    const { isAuthenticated, user, logout, role } = useAuth()

    return (
        <div>
            <Link to={`/cambiarcontraseña/${user._id}`}></Link>
        </div>
    )
}

export default ManagerPage