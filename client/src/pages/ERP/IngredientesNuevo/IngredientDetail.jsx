import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useIngredient } from '../../../context/IngredientContext';

const IngredientDetail = () => {
  const { id } = useParams();
  const { getIngredient, ingredient } = useIngredient();

  useEffect(() => {
    getIngredient(id);
  }, [id]);

  if (!ingredient) {
    return <div>Loading...</div>; // or any other message/component for when ingredient is undefined
  }

  return (
    <div>
      <h2>Ingredient Detail</h2>
      <h3>{ingredient.name}</h3>
      <p>Stock: {ingredient.stock}</p>

      <h3>Stock In History</h3>
      {/* Table showing stock in history */}

      <h3>Stock Out History</h3>
      {/* Table showing stock out history */}

      

    </div>
  );
};

export default IngredientDetail;
