import { createContext, useContext } from 'react'
import { useState } from 'react'
import { createAdminHistoryRequest, deleteAdminHistoryRequest, getAdminHistoriesRequest, updateAdminHistoryRequest } from '../api/adminhistory.js'

const AdminHistoryContext = createContext()

export const useAdminHistory = () => {
    const context = useContext(AdminHistoryContext)

    if (!context) {
        throw new Error('useTask must be used within a TaskProvider')
    }

    return context
}

export function AdminHistoryProvider({ children }) {

    const [adminHistories, setAdminHistories] = useState([])

    const getAdminHistories = async (id) => {
        try {
            const res = await getAdminHistoriesRequest(id)
            setAdminHistories(res.data)
            console.log(adminHistories)
        } catch (error) {
            console.log(error)
        }
    }

    const createAdminHistory = async (adminHistory) => {

        const res = await createAdminHistoryRequest(adminHistory)
        console.log(res)
    }

    const deleteAdminHistory = async (id) => {
        try {
            const res = await deleteAdminHistoryRequest(id)
            if (res.status === 204) setAdminHistories(adminHistories.filter(x => x._id != id))
        } catch (error) {
            console.log(error)
        }

    }

    // const getTask = async (id) => {
    //     try {
    //         const res = await getTaskRequest(id)
    //         return res.data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const updateAdminHistory = async (id, adminHistory) => {
        try {
            await updateAdminHistoryRequest(id, adminHistory)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AdminHistoryContext.Provider value={{
            adminHistories,
            createAdminHistory,
            getAdminHistories,
            deleteAdminHistory,
            updateAdminHistory
        }}>
            {children}
        </AdminHistoryContext.Provider>
    )
}