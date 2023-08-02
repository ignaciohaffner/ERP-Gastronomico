// AddStockForm.jsx

import React, { useState, useEffect } from 'react';
import { useIngredient } from '../../../context/IngredientContext';

const AddStockForm = () => {
  const { ingredients, createStockForIngredient, getIngredients } = useIngredient();
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {

    const recuperarIngredientes = async () => {
      await getIngredients()
    }

    recuperarIngredientes()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const stockMovement = {
      ingredient: selectedIngredient,
      quantity: parseFloat(quantity),
      price: parseFloat(price),
      movementType: 'entrada', // Set the type as 'stock-in'
    };
    console.log(stockMovement)
    createStockForIngredient(stockMovement);
    // Optionally, you can reset the form fields here
  };

  return (
    <div>
      <h2>Add Stock</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ingredient">Select Ingredient:</label>
        <select
          id="ingredient"
          value={selectedIngredient}
          onChange={(e) => setSelectedIngredient(e.target.value)}
        >
          {ingredients.map((ingredient) => (
            <option key={ingredient._id} value={ingredient._id}>
              {ingredient.name}
            </option>
          ))}
        </select>


        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <br />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <button type="submit">Add Stock</button>
      </form>
    </div>
  );
};

export default AddStockForm;
