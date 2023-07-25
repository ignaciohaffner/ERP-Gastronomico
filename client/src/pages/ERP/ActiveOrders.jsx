import React, { useEffect, useState } from 'react'
import { useOrder } from '../../context/OrderContext'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { updateOrder } from '../../../../src/controllers/order.controller';
dayjs.extend(utc);
dayjs.extend(timezone);

import socketIOClient from 'socket.io-client';


const ActiveOrders = () => {

    const { orders, getOrders, updateOrder } = useOrder()

    const [socket, setSocket] = useState(null); // Add state for socket instance

  useEffect(() => {
    // Fetch orders when the component mounts
    getOrders();

    // Create the WebSocket connection and store the socket instance in the state
    const socket = socketIOClient('http://localhost:4001');
    setSocket(socket);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Listen for 'newOrder' event and update orders list when received
    if (socket) {
      socket.on('newOrder', (newOrder) => {
        console.log('Nueva orden recibida:', newOrder);
        getOrders(); // Fetch the updated list of orders after receiving a new order
      });
    }
  }, [socket]);

    const deactivateOrder = async (order) => {
        await updateOrder(order._id, { activeOrder: false });
        console.log(order);
        getOrders(); // Obtener la lista actualizada de órdenes después de desactivar una orden
    }

    const activeOrders = orders.filter(order => order.activeOrder);


    return (
        <div>
            {
                activeOrders.map(order => (
                    <div key={order._id} className='border-2 mt-2 p-2 flex flex-col justify-between'>
                        <nav className='flex justify-between'>
                            <p>{order.customerName}</p>
                            <p className=''>{dayjs(order.createdAt).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')}</p>
                        </nav>
                        {
                            order.articles.map(articles => (
                                <p>- {articles.name}</p>
                            ))
                        }
                        <div className='flex justify-between'>
                            <p>${order.amount}</p>
                            <p>{order.paymentType}</p>
                            <p>{order.deliveryAddress === "" ? "Take Away" : order.deliveryAddress}</p>
                            <button className='bg-green-500 p-1 rounded' onClick={()=> deactivateOrder(order)} >Despachar</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ActiveOrders