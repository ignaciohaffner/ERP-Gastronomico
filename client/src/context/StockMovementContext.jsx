import { createContext, useContext } from 'react';
import { useState } from 'react';
import {
  createStockMovementRequest,
  deleteStockMovementRequest,
  getStockMovementRequest,
  getStockMovementsRequest,
  updateStockMovementRequest,
} from '../api/stockMovement';

const StockMovementContext = createContext();

export const useStockMovement = () => {
  const context = useContext(StockMovementContext);

  if (!context) {
    throw new Error('useStockMovement must be used within a StockMovementProvider');
  }

  return context;
};

export function StockMovementProvider({ children }) {
  const [stockMovements, setStockMovements] = useState([]);

  const getStockMovements = async () => {
    try {
      const res = await getStockMovementsRequest();
      setStockMovements(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createStockMovement = async (stockMovement) => {
    try {
      const res = await createStockMovementRequest(stockMovement);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStockMovement = async (id) => {
    try {
      const res = await deleteStockMovementRequest(id);
      if (res.status === 204) setStockMovements(stockMovements.filter((movement) => movement._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getStockMovement = async (id) => {
    try {
      const res = await getStockMovementRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateStockMovement = async (id, stockMovement) => {
    try {
      await updateStockMovementRequest(id, stockMovement);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StockMovementContext.Provider
      value={{
        stockMovements,
        createStockMovement,
        getStockMovements,
        deleteStockMovement,
        getStockMovement,
        updateStockMovement,
      }}
    >
      {children}
    </StockMovementContext.Provider>
  );
}
