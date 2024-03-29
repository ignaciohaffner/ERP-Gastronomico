import Order from '../models/order.model.js'



export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch (error) {
        return res.status(500).json({ message: 'no pudiste mostrar eso mostro' })
    }
}

export const createOrder = async (req, res, io) => {
    try {
      const { paymentType, amount, articles, customerName, deliveryAddress } =
        req.body;
      const newOrder = new Order({
        paymentType,
        amount,
        articles,
        customerName,
        deliveryAddress,
      });
      const savedOrder = await newOrder.save();
      res.json(savedOrder); // Sending the single response
      io.emit('newOrder', savedOrder); // Emit the newOrder event to connected WebSocket clients
    } catch (error) {
      console.log('no funco man');
      return res
        .status(500)
        .json({ message: 'no pudiste agregar eso mostro' }); // Handling the error in the same response
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

