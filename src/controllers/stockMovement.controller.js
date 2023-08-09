import { limpiarStock } from '../libs/cleanDatabase.js';
import StockMovement from '../models/stockMovement.model.js';

export const getStockMovements = async (req, res) => {
  try {
    const stockMovements = await StockMovement.find();
    res.json(stockMovements);
  } catch (error) {
    return res.status(500).json({ message: 'No pudiste mostrar los movimientos de stock.' });
  }
};

export const createStockMovement = async (req, res) => {
  try {
    const { ingredient, quantity, price, movementType } = req.body;
    const newStockMovement = new StockMovement({
      ingredient,
      quantity,
      price,
      movementType,
    });
    console.log(newStockMovement)
    const savedStockMovement = await newStockMovement.save();
    res.json(savedStockMovement);
  } catch (error) {
    return res.status(500).json({ message: 'No pudiste agregar el movimiento de stock.' });
  }
};

export const getStockMovement = async (req, res) => {
  try {
    const stockMovement = await StockMovement.findById(req.params.id);
    if (!stockMovement) return res.status(404).json({ message: 'No se encontró el movimiento de stock.' });
    res.json(stockMovement);
  } catch (error) {
    return res.status(404).json({ message: 'No se encontró el movimiento de stock.' });
  }
};


export const getStockByIngredient = async (req,res) => {
  try {
    const stockMovement = await StockMovement.find({ingredient: req})
    if (!stockMovement) return res.status(404).json({message: 'no se encontro un movimiento de stock para esa ID de ingrediente'})
    res.json(stockMovement)
  } catch(error) {
    return res.status(404).json({message: 'no se encontro un movimiento de stock para esa ID de ingrediente'})
  }
}

export const deleteStockMovement = async (req, res) => {
  try {
    limpiarStock()
    const stockMovement = await StockMovement.findByIdAndDelete(req.params.id);
    if (!stockMovement) return res.status(404).json({ message: 'No se encontró el movimiento de stock.' });
    res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: 'No se pudo eliminar el movimiento de stock.' });
  }
};

export const updateStockMovement = async (req, res) => {
  try {
    const stockMovement = await StockMovement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stockMovement) return res.status(404).json({ message: 'No se encontró el movimiento de stock.' });
    res.json(stockMovement);
  } catch (error) {
    console.log(error)
  }
};
