
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIngredient } from '../../../context/IngredientContext';

const IngredientList = () => {
  const { getIngredients, ingredients } = useIngredient();

  useEffect(() => {
    getIngredients();
  }, []);

  if (!ingredients) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Ingredient List</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <Link to={`/ingredients/${ingredient._id}/history`}>{ingredient.name}</Link> - Stock: {ingredient.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientList;