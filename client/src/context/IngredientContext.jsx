import { createContext, useContext } from 'react'
import { useState } from 'react'
import { createIngredientRequest, deleteIngredientRequest, getIngredientRequest, getIngredientsRequest, updateIngredientRequest } from '../api/ingredient'

const IngredientContext = createContext()

export const useIngredient = () => {
    const context = useContext(IngredientContext)

    if (!context) {
        throw new Error('useTask must be used within a TaskProvider')
    }

    return context
}

export function IngredientProvider({ children }) {

    const [ingredients, setIngredients] = useState([])

    const getIngredients = async () => {
        try {
            const res = await getIngredientsRequest()
            setIngredients(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createIngredient = async (ingredient) => {

        const res = await createIngredientRequest(ingredient)
        console.log(res)
    }

    const deleteIngredient = async (id) => {
        try {
            const res = await deleteIngredientRequest(id)
            if (res.status === 204) setIngredients(ingredients.filter(task => task._id != id))
        } catch (error) {
            console.log(error)
        }

    }

    const getIngredient = async (id) => {
        try {
            const res = await getIngredientRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateIngredient = async (id, ingredient) => {
        try {
            await updateIngredientRequest(id, ingredient)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <IngredientContext.Provider value={{
            ingredients,
            createIngredient,
            getIngredients,
            deleteIngredient,
            getIngredient,
            updateIngredient
        }}>
            {children}
        </IngredientContext.Provider>
    )
}