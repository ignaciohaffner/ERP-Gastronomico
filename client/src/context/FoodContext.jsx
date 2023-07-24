import { createContext, useContext } from 'react'
import { useState } from 'react'
import { createFoodRequest, getFoodsRequest, deleteFoodRequest, getFoodRequest, updateFoodRequest } from '../api/food'

const FoodContext = createContext()

export const useFood = () => {
    const context = useContext(FoodContext)

    if (!context) {
        throw new Error('useTask must be used within a TaskProvider')
    }

    return context
}

export function FoodProvider({ children }) {

    const [foods, setFoods] = useState([])

    const getFoods = async () => {
        try {
            const res = await getFoodsRequest()
            setFoods(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createFood = async (food) => {

        const res = await createFoodRequest(food)
        console.log(res)
    }

    const deleteFood = async (id) => {
        try {
            const res = await deleteFoodRequest(id)
            if (res.status === 204) setFoods(foods.filter(task => task._id != id))
        } catch (error) {
            console.log(error)
        }

    }

    const getFood = async (id) => {
        try {
            const res = await getFoodRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateFood = async (id, food) => {
        try {
            await updateFoodRequest(id, food)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <FoodContext.Provider value={{
            foods,
            createFood,
            getFoods,
            deleteFood,
            getFood,
            updateFood
        }}>
            {children}
        </FoodContext.Provider>
    )
}