import Order from '../models/order.model.js';
import Ingredient from '../models/ingredients.model.js';
import { createStockMovement } from './stockMovement.controller.js';

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
  
      // Restar el stock de ingredientes utilizados en los artículos del pedido
      for (const article of articles) {
        const ingredient = await Ingredient.findById(article.ingredientId);
        if (!ingredient) {
          return res.status(404).json({ message: `No se encontró el ingrediente con ID ${article.ingredientId}.` });
        }
  
        if (ingredient.type === "Unidad") {
          // Si el ingrediente es de tipo "Unidad", restamos el stock en términos de peso
          const totalStockNeeded = article.quantity * ingredient.price;
          if (ingredient.quantity < totalStockNeeded) {
            return res.status(400).json({ message: `No hay suficiente stock para el ingrediente ${ingredient.name}.` });
          }
  
          const newStockMovement = new StockMovement({
            ingredient: article.ingredientId,
            quantity: totalStockNeeded,
            price: ingredient.price,
            movementType: "salida",
          });
  
          await newStockMovement.save();
  
          // Actualizar la cantidad disponible del ingrediente
          ingredient.quantity -= totalStockNeeded;
          await ingredient.save();
        } else {
          // Si el ingrediente es de tipo "Peso", restamos el stock normalmente
          if (ingredient.quantity < article.quantity) {
            return res.status(400).json({ message: `No hay suficiente stock para el ingrediente ${ingredient.name}.` });
          }
  
          const newStockMovement = new StockMovement({
            ingredient: article.ingredientId,
            quantity: article.quantity,
            price: ingredient.price,
            movementType: "salida",
          });
  
          await newStockMovement.save();
  
          // Actualizar la cantidad disponible del ingrediente
          ingredient.quantity -= article.quantity;
          await ingredient.save();
        }
      }
  
      const savedOrder = await newOrder.save();
      res.json(savedOrder);
      io.emit("newOrder", savedOrder);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "No pudiste agregar la orden." });
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
