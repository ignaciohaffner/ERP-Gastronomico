import Food from '../models/food.model.js'

export const getFoods = async (req, res) => {
    try {
        const foods = await Food.find()
        res.json(foods)
    } catch (error) {
        return res.status(500).json({ message: 'no pudiste mostrar eso mostro' })
    }
}

export const createFood = async (req, res) => {

    try {
        const { name, description,price } = req.body
        const newFood = new Food({
            name,
            description,
            price,
        })
        const savedFood = await newFood.save()
        res.json(savedFood)
    } catch (error) {
        return res.status(500).json({ message: 'no pudiste agregar eso mostro' })
    }

}

export const getFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id).populate('user')
        console.log(req.params.id)

        if (!food) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
        res.json(food)
    } catch (error) {
        return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
    }

}

export const deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id)
        if (!food) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: 'no pudiste mostrar eso man' })

    }
}

export const updateFood = async (req, res) => {

    try {
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true, })
        if (!food) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
        res.json(food)
    } catch (error) {
        return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
    }

}

