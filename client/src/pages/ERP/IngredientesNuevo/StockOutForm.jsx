import React, { useState } from 'react';
import { useIngredient } from '../../../context/IngredientContext';

const StockOutForm = () => {
  const { removeStock } = useIngredient();
  const [quantity, setQuantity] = useState(0);

  const handleRemoveStock = () => {
    // Call the removeStock function with the ingredient ID and quantity
    removeStock('ingredientId', quantity);
  };

  return (
    <div>
      <h2>Remove Stock</h2>
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={handleRemoveStock}>Remove</button>
    </div>
  );
};

export default StockOutForm;
