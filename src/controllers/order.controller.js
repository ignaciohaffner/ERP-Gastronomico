import Order from '../models/order.model.js'



export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch (error) {
        return res.status(500).json({ message: 'no pudiste mostrar eso mostro' })
    }
}

export const createOrder = async (req, res) => {
    try {
      const { paymentType, amount, articles, customerName, deliveryAddress } = req.body;
      const newOrder = new Order({
        paymentType,
        amount,
        articles,
        customerName,
        deliveryAddress,
      });
      const savedOrder = await newOrder.save();
  
      // Send the WebSocket event before sending the JSON response
      try {
        io.emit('newOrder', savedOrder);
      } catch (error) {
        console.log('Error while emitting WebSocket event:', error);
      }
  
      // Send the JSON response
      res.json(savedOrder);
    } catch (error) {
      console.log('Error while saving order:', error);
      return res.status(500).json({ message: 'no pudiste agregar eso mostro' });
    }
  };

export const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        console.log(req.params.id)

        if (!order) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
        res.json(order)
    } catch (error) {
        return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
    }

}

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        if (!order) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: 'no pudiste mostrar eso man' })

    }
}

export const updateOrder = async (req, res) => {

    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, })
        if (!order) return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
        res.json(order)
    } catch (error) {
        return res.status(404).json({ message: 'no se encontro esa tarea mostro' })
    }

}

