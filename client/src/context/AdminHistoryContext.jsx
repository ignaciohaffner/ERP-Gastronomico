import { createContext, useContext } from 'react'
import { useState } from 'react'
import { createAdminHistoryRequest, getAdminHistoriesRequest } from '../api/adminhistory.js'

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

    const getAdminHistories = async () => {
        try {
            const res = await getAdminHistoriesRequest()
            setAdminHistories(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createAdminHistory = async (task) => {

        const res = await createAdminHistoryRequest(task)
        console.log(res)
    }

    // const deleteTask = async (id) => {
    //     try {
    //         const res = await deleteTaskRequest(id)
    //         if (res.status === 204) setTasks(tasks.filter(task => task._id != id))
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }

    // const getTask = async (id) => {
    //     try {
    //         const res = await getTaskRequest(id)
    //         return res.data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const updateTask = async (id, task) => {
    //     try {
    //         await updateTaskRequest(id, task)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    return (
        <AdminHistoryContext.Provider value={{
            adminHistories,
            createAdminHistory,
            getAdminHistories,
        }}>
            {children}
        </AdminHistoryContext.Provider>
    )
}