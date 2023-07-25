import React, { useEffect } from 'react'
import { useOrder } from '../../context/OrderContext'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { updateOrder } from '../../../../src/controllers/order.controller';
dayjs.extend(utc);
dayjs.extend(timezone);

const ActiveOrders = () => {

    const { orders, getOrders, updateOrder } = useOrder()

    useEffect(() => {
        getOrders()
        console.log(orders)
    }, []);

    // const deactivateOrder = (order) => {
    //     updateOrder(order._id, { activeOrder: false })
    //     console.log(order)
    // }

    const activeOrders = orders.filter(order => order.activeOrder);


    return (
        <div class>
            {
                activeOrders.map(order => (
                    <div className='border-2 mt-2 p-2 flex flex-col justify-between'>
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
                            <button className='bg-green-500 p-1 rounded' >Despachar</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ActiveOrders