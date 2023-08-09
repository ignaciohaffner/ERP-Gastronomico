import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useIngredient } from '../../../context/IngredientContext';
import {useStockMovement} from '../../../context/StockMovementContext'
import {Table} from '@rewind-ui/core'

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
    (stockMovement) => id === stockMovement.ingredient && 'entrada' === stockMovement.movementType
  );

  const filteredExitStockMovements = stockMovements.filter(
    (stockMovement) => id === stockMovement.ingredient && 'salida' === stockMovement.movementType
  );


  if (!ingredient) {
    return <div>Loading...</div>; // or any other message/component for when ingredient is undefined
  }

  return (
    <div>
      <h2>Ingredient Detail</h2>
      <h3>{ingredient.name}</h3>
      <p>Stock: {ingredient.stock}</p>

      <h3 className='my-5 text-3xl text-center'>Stock In History</h3>

      <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th align="left">ID</Table.Th>
          <Table.Th align="left">Cantidad Comprada</Table.Th>
          <Table.Th>Cantidad disponible</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
      {
        filteredStockMovements.map((stockMovement) => (
          <Table.Tr>
          <Table.Td>{stockMovement.ingredient}</Table.Td>
          <Table.Td>{stockMovement.quantity}</Table.Td>
          <Table.Td align="center">{(stockMovement.quantity - stockMovement.usedQuantity)}</Table.Td>
        </Table.Tr>
                  ))
      }
      </Table.Tbody>
    </Table>


    <h3 className='my-5 text-3xl text-center'>Used Stock</h3>


    <Table className='mt-5'>
      <Table.Thead>
        <Table.Tr>
          <Table.Th align="left">ID</Table.Th>
          <Table.Th align="left">Usada</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
      {
        filteredExitStockMovements.map((stockMovement) => (
          <Table.Tr>
          <Table.Td>{stockMovement.ingredient}</Table.Td>
          <Table.Td>{stockMovement.quantity}</Table.Td>
        </Table.Tr>
                  ))
      }
      </Table.Tbody>
    </Table>




    </div>
  );
};

export default IngredientDetail;
