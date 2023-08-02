import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useIngredient } from '../../../context/IngredientContext';
import {useStockMovement} from '../../../context/StockMovementContext'

const IngredientDetail = () => {
  const { id } = useParams();
  const { getIngredient, ingredient } = useIngredient();
  const { getStockMovements, stockMovements } = useStockMovement();


  useEffect(() => {
    getIngredient(id);
  }, [id]);

  useEffect(() => {
    
    const recuperarStock = async () => {
    await getStockMovements()

    }

    recuperarStock()
  }, []);

  const filteredStockMovements = stockMovements.filter(
    (stockMovement) => id === stockMovement.ingredient
  );

  if (!ingredient) {
    return <div>Loading...</div>; // or any other message/component for when ingredient is undefined
  }

  return (
    <div>
      <h2>Ingredient Detail</h2>
      <h3>{ingredient.name}</h3>
      <p>Stock: {ingredient.stock}</p>

      <h3>Stock In History</h3>
      <div className='flex gap-x-5 flex-col'>
        <div className='flex gap-x-5'>
        <p>ID</p>
        <p>Cantidad comprada</p>
        <p>Cantidad disponible</p>
        <p>Precio</p>
        </div>
      {
        filteredStockMovements.map((stockMovement) => (
          <div className='flex gap-x-5'>
            <p>{stockMovement.ingredient}</p>
          <p>{stockMovement.quantity}</p>
          <p>{(stockMovement.quantity - stockMovement.usedQuantity)}</p>
          <p>${stockMovement.price}</p>

          </div>
                  ))
      }
      </div>
      

      <h3>Stock Out History</h3>
      {/* Table showing stock out history */}

      

    </div>
  );
};

export default IngredientDetail;
