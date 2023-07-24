import AdminAnnouncement from "../models/adminAnnouncement.js"

export const getAdminAnnouncements = async (res) => {
    try {
        const adminAnnouncements = await AdminAnnouncement.find({
        }).populate('user')
        res.json(adminAnnouncements)
        console.log((adminAnnouncements))
    } catch (error) {
        // return res.status(500).json({ message: 'no pudiste mostrar eso mostro' })
    }
}

export const createAdminAnnouncement = async (req, res) => {

    try {
        const { title, description, date } = req.body
        console.log(req.user.id)
        const newAdminAnnouncement = new AdminAnnouncement({
            title,
            description,
            date,
            user: req.user.id,
        })
        const savedAdminAnnouncement = await newAdminAnnouncement.save()
        res.json(savedAdminAnnouncement)
    } catch (error) {
        console.log(error)
        // return res.status(500).json({ message: 'no pudiste agregar eso mostro' })
    }

}


export const deleteAdminAnnouncement = async (req, res) => {
    try {
        const deletedAdminAnnouncement = await AdminAnnouncement.findByIdAndDelete(req.params.id)
        if (!deletedAdminAnnouncement) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: 'no pudiste mostrar eso man' })

    }
}

export const updateAdminAnnouncement = async (req, res) => {

    try {
        const adminAnnouncement = await AdminAnnouncement.findByIdAndUpdate(req.params.id, req.body, { new: true, })
        if (!adminAnnouncement) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
        res.json(adminAnnouncement)
    } catch (error) {
        return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
    }

}

