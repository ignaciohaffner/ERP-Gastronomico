import { createContext, useContext } from 'react'
import { useState } from 'react'
import { getUsersRequest, getUserRequest, deleteUserRequest, updateUserRequest } from '../api/users'

const UserContext = createContext()

export const useUsers = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }

    return context
}

export function UserProvider({ children }) {

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const res = await getUsersRequest()
            setUsers(res.data)
            console.log(users)
        } catch (error) {
            console.log(error)
        }
    }

    const getUser = async (id) => {
        try {
            console.log(id, "id dese getuser")
            const res = await getUserRequest(id)
            return (res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id)
            if (res.status === 204) setUsers(users.filter(user => user._id != id))
        } catch (error) {
            console.log(error, 'delete user')
        }
    }


    const updateUser = async (id, user) => {
        try {
            const res = await updateUserRequest(id, user)
            if (res.status === 204) setUsers(users.filter(user => user._id))
        } catch (error) {
            console.log(error, 'update user')
        }
    }
    return (
        <UserContext.Provider value={{
            users,
            getUsers,
            deleteUser,
            updateUser,
            getUser
        }}>
            {children}
        </UserContext.Provider>
    )
}