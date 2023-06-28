import User from '../models/user.model.js'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        return res.status(500).json({ message: 'no pudiste mostrar eso ome' })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        return res.status(500).json({ message: 'no se encontro el user' })

    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({ message: 'no se encontro ese user mostro' })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: 'no pudiste borrar eso mostro' })
    }
}
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: 'no pudiste mostrar eso man' })

    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        if (!user) return res.status(404).json({ message: 'no se encontro ese user mostro' })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: 'no pudiste updatear eso man' })
    }
}