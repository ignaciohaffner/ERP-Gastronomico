import { createContext, useContext } from 'react'
import { useState } from 'react'
import { createAdminAnnouncementRequest, getAdminAnnouncementsRequest } from '../api/adminannouncement.js'
import { createAdminHistoryRequest, deleteAdminHistoryRequest, getAdminHistoriesRequest, updateAdminHistoryRequest } from '../api/adminhistory.js'

const AdminAnnouncementContext = createContext()

export const useAdminAnnouncement = () => {
    const context = useContext(AdminAnnouncementContext)

    if (!context) {
        throw new Error('useTask must be used within a TaskProvider')
    }

    return context
}

export function AdminAnnouncementProvider({ children }) {

    const [adminAnnouncements, setAdminAnnouncements] = useState([])

    const getAdminAnnouncements = async () => {
        try {
            const res = await getAdminAnnouncementsRequest(id)
            setAdminAnnouncements(res.data)
            console.log(adminAnnouncements)
        } catch (error) {
            console.log(error)
        }
    }

    const createAdminAnnouncement = async (adminHistory) => {

        const res = await createAdminAnnouncementRequest(adminHistory)
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
        <AdminAnnouncementContext.Provider value={{
            adminAnnouncements,
            getAdminAnnouncements,
            createAdminAnnouncement
        }}>
            {children}
        </AdminAnnouncementContext.Provider>
    )
}