import AdminHistory from '../models/adminHistory.model.js'

export const getAdminHistory = async (req, res) => {
    try {
        const adminHistories = await AdminHistory.find({
            user: req.user.id
        }).populate('user')
        res.json(adminHistories)
    } catch (error) {
        return res.status(500).json({ message: 'no pudiste mostrar eso mostro' })
    }
}

export const createAdminHistory = async (req, res) => {

    try {
        const { title, description, date, userReceiver } = req.body
        const newAdminHistory = new AdminHistory({
            title,
            description,
            date,
            user: req.user.id,
            userReceiver
        })
        const savedAdminHistory = await newAdminHistory.save()
        res.json(savedAdminHistory)
    } catch (error) {
        console.log(error)
        // return res.status(500).json({ message: 'no pudiste agregar eso mostro' })
    }

}

// export const getTask = async (req, res) => {
//     try {
//         const adminHistory = await AdminHistory.findById(req.params.id).populate('user')
//         console.log(req.params.id)

//         if (!task) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
//         res.json(task)
//     } catch (error) {
//         return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
//     }

// }

// export const deleteTask = async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id)
//         if (!task) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
//         return res.sendStatus(204)
//     } catch (error) {
//         return res.status(404).json({ message: 'no pudiste mostrar eso man' })

//     }
// }

// export const updateTask = async (req, res) => {

//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, })
//         if (!task) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
//         res.json(task)
//     } catch (error) {
//         return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
//     }

// }

