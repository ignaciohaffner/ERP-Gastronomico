import Ingredient from '../models/ingredients.model.js'

export const getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find()
        res.json(ingredients)
    } catch (error) {
        return res.status(500).json({ message: 'no pudiste mostrar eso mostro' })
    }
}

export const createIngredient = async (req, res) => {

    try {
        const { name, quantity,price, type, conversion } = req.body
        const newIngredient = new Ingredient({
            name,
            quantity,
            price,
            type,
            conversion
        })
        const savedIngredient = await newIngredient.save()
        res.json(savedIngredient)
    } catch (error) {
        return res.status(500).json({ message: 'no pudiste agregar eso mostro' })
    }

}

export const getIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id)
        console.log(req.params.id)

        if (!ingredient) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
        res.json(ingredient)
    } catch (error) {
        console.log(error)
    }

}

export const deleteIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findByIdAndDelete(req.params.id)
        if (!ingredient) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
        return res.sendStatus(204)
    } catch (error) {
        console.log(error)

    }
}

export const updateIngredient = async (req, res) => {
    try {
        const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedIngredient) {
            return res.status(404).json({ message: 'No se encontró ese ingrediente.' });
        }
        res.json(updatedIngredient);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el ingrediente.' });
    }
}

