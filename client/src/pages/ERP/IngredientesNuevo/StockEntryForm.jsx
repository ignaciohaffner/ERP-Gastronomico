import React, { useState } from 'react';
import { useIngredient } from '../../../context/IngredientContext';

const StockEntryForm = () => {
  const { addStock } = useIngredient();
  const [quantity, setQuantity] = useState(0);

  const handleAddStock = () => {
    // Call the addStock function with the ingredient ID and quantity
    addStock('ingredientId', quantity);
  };

  return (
    <div>
      <h2>Add Stock</h2>
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={handleAddStock}>Add</button>
    </div>
  );
};

export default StockEntryForm;
