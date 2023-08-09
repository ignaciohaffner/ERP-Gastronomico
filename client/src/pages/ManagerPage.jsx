import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {useStockMovement} from '../context/StockMovementContext'
const ManagerPage = () => {

    const {deleteStockMovement} = useStockMovement()

    const { isAuthenticated, user, logout, role } = useAuth()

    return (
        <div>
            <button onClick={()=> {deleteStockMovement()}}>Borrar stock</button>
        </div>
    )
}

export default ManagerPage