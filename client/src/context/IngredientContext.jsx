import { createContext, useContext } from 'react';
import { useState } from 'react';
import {
  createIngredientRequest,
  deleteIngredientRequest,
  getIngredientRequest,
  getIngredientsRequest,
  updateIngredientRequest,
} from '../api/ingredient';

import {
  createStockMovementRequest,
} from '../api/stockMovement'

const IngredientContext = createContext();

export const useIngredient = () => {
  const context = useContext(IngredientContext);

  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }

  return context;
};

export function IngredientProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState(null); // Add a new state for the current ingredient

  const getIngredients = async () => {
    try {
      const res = await getIngredientsRequest();
      setIngredients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createIngredient = async (ingredient) => {
    try {
      // Crear el ingrediente
      const res = await createIngredientRequest(ingredient);
      const newIngredient = res.data;
      // Actualizar el estado de ingredientes con el nuevo ingrediente
      setIngredients([...ingredients, newIngredient]);
    } catch (error) {
      console.log(error);
    }
  }

  const createStockForIngredient = async (stock) => {
    try {
      console.log(stock)
      const newStock = {
        ingredient: stock.ingredient,
        quantity: stock.quantity, 
        movementType: stock.movementType,
        price: stock.price

      };
  
      const res = await createStockMovementRequest(newStock);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIngredient = async (id) => {
    try {
      const res = await deleteIngredientRequest(id);
      if (res.status === 204) setIngredients(ingredients.filter((task) => task._id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const getIngredient = async (id) => {
    try {
      const res = await getIngredientRequest(id);
      setIngredient(res.data); // Set the current ingredient here
    } catch (error) {
      console.log(error);
    }
  };

  const updateIngredient = async (id, ingredient) => {
    try {
      await updateIngredientRequest(id, ingredient);
    } catch (error) {
      console.log(error);
    }
  }
  
  // ... Rest of the code remains the same

  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        ingredient, // Add the current ingredient to the context value
        createIngredient,
        getIngredients,
        deleteIngredient,
        createStockForIngredient,
        getIngredient,
        updateIngredient,
      }}
    >
      {children}
    </IngredientContext.Provider>
  );
}
