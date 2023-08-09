import Order from '../models/order.model.js';
import Ingredient from '../models/ingredients.model.js';
import StockMovement from '../models/stockMovement.model.js'

import { createStockMovement, getStockByIngredient, getStockMovement, updateStockMovement } from './stockMovement.controller.js';
import {getIngredient} from './ingredients.controller.js'

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'No pudiste mostrar las órdenes.' });
  }
};

export const createOrder = async (req, res, io) => {
  try {
    const { paymentType, amount, articles, customerName, deliveryAddress } = req.body;
    const newOrder = new Order({
      paymentType,
      amount,
      articles,
      customerName,
      deliveryAddress,
    });

    for (const article of articles) {
      for (const foodIngredient of article.ingredients) {
        const ingredient = await Ingredient.findById(foodIngredient._id);
        let stockArray = await StockMovement.find({ ingredient: foodIngredient._id });
        stockArray = stockArray.filter((stock) => !stock.isUsed);

        if (!ingredient) {
          return res.status(404).json({ message: `No se encontró el ingrediente con ID ${foodIngredient._id}.` });
        }

        if (ingredient.type === 'Unidad') {
          let totalStockNeeded = foodIngredient.quantity * ingredient.conversion;

          for (const stockIndividual of stockArray) {
            if (totalStockNeeded <= 0 || stockIndividual._id === undefined) {
              break;
            }

            const availableStock = stockIndividual.quantity - stockIndividual.usedQuantity;
            const stockUsed = Math.min(availableStock, totalStockNeeded);

            if (stockUsed > 0) {
              await StockMovement.findByIdAndUpdate(stockIndividual._id, { $inc: { usedQuantity: stockUsed } });

              const newStockMovement = new StockMovement({
                ingredient: foodIngredient._id,
                quantity: stockUsed,
                price: 0,
                movementType: 'salida',
              });

              await newStockMovement.save();
              totalStockNeeded -= stockUsed;

              if (availableStock === stockUsed) {
                await StockMovement.findByIdAndUpdate(stockIndividual._id, { $set: { isUsed: true } });
              }
            }
          }
        } else {
          let totalStockNeeded = foodIngredient.quantity;

          for (const stockIndividual of stockArray) {
            if (totalStockNeeded <= 0 || stockIndividual._id === undefined) {
              break;
            }

            const availableStock = stockIndividual.quantity - stockIndividual.usedQuantity;
            const stockUsed = Math.min(availableStock, totalStockNeeded);

            if (stockUsed > 0) {
              await StockMovement.findByIdAndUpdate(stockIndividual._id, { $inc: { usedQuantity: stockUsed } });

              const newStockMovement = new StockMovement({
                ingredient: foodIngredient._id,
                quantity: stockUsed,
                price: 0,
                movementType: 'salida',
              });

              await newStockMovement.save();
              totalStockNeeded -= stockUsed;

              if (availableStock === stockUsed) {
                await StockMovement.findByIdAndUpdate(stockIndividual._id, { $set: { isUsed: true } });
              }
            }
          }
        }
      }
    }

    const savedOrder = await newOrder.save();
    res.json({ message: 'Pedido creado y stock actualizado correctamente' });
    io.emit('newOrder', savedOrder);
  } catch (error) {
    console.error(error);

    if (error.message.includes('No se encontró el ingrediente')) {
      return res.status(404).json({ message: 'No se encontró el ingrediente especificado.' });
    } else if (error.message.includes('No hay suficiente stock')) {
      return res.status(400).json({ message: 'No hay suficiente stock disponible para completar el pedido.' });
    } else {
      return res.status(500).json({ message: 'Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.' });
    }
  }
};
  
  

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'No se encontró la orden.' });
    res.json(order);
  } catch (error) {
    return res.status(404).json({ message: 'No se encontró la orden.' });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'No se encontró la orden.' });

    // Revertir los movimientos de stock relacionados con la orden eliminada
    for (const article of order.articles) {
      const ingredient = await Ingredient.findById(article.ingredientId);
      if (!ingredient) {
        return res.status(404).json({ message: `No se encontró el ingrediente con ID ${article.ingredientId}.` });
      }

      const newStockMovement = new StockMovement({
        ingredient: article.ingredientId,
        quantity: article.quantity,
        price: ingredient.price,
        movementType: 'entrada',
      });

      await createStockMovement(newStockMovement); // Crear una nueva entrada de stock de tipo "entrada" para revertir el stock utilizado

      // Actualizar la cantidad disponible del ingrediente
      ingredient.quantity += article.quantity;
      await ingredient.save();
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: 'No se pudo eliminar la orden.' });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: 'No se encontró la orden.' });
    res.json(order);
  } catch (error) {
    return res.status(404).json({ message: 'No se encontró la orden.' });
  }
};
