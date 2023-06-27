import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).populate('user')
        res.json(tasks)
    } catch (error) {
        return res.status(500).json({ message: 'no pudiste mostrar eso mostro' })
    }
}

export const createTask = async (req, res) => {

    try {
        const { title, description, date } = req.body
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id
        })
        const savedTask = await newTask.save()
        res.json(savedTask)
    } catch (error) {
        return res.status(500).json({ message: 'no pudiste agregar eso mostro' })
    }

}

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user')
        console.log(req.params.id)

        if (!task) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
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

export const updateTask = async (req, res) => {

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, })
        if (!task) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
    }

}

