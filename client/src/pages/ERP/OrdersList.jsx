import React, { useEffect } from 'react'
import { useOrder } from '../../context/OrderContext'
import { Table, Badge } from '@rewind-ui/core'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const OrdersList = () => {

    const { orders, getOrders } = useOrder()

    useEffect(() => {
        getOrders()
        console.log(orders)
    }, []);

    return (
        <>

            <div>
                <h1 className='text-2xl text-center text-bold mb-5'>Lista de Pedidos</h1>
                <div>
                    <Table headerColor="dark" radius="md" size="lg" verticalBorders={true}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th align="left">Nombre</Table.Th>
                                <Table.Th align="left">Hora</Table.Th>
                                <Table.Th align="left">Direccion</Table.Th>
                                <Table.Th align="left">Monto</Table.Th>
                                <Table.Th align="center">Activo</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>

                            {orders.map(order => (

                                <Table.Tr>
                                    <Table.Td>{order.customerName}</Table.Td>
                                    <Table.Td>{dayjs(order.createdAt).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')}</Table.Td>
                                    <Table.Td>{order.deliveryAddress === "" ? "Take Away" : order.deliveryAddress}</Table.Td>
                                    <Table.Td>${order.amount}</Table.Td>
                                    <Table.Td align='center'>  {order.activeOrder ? (<Badge color="green" className='p-1' tone="outline">
                                        <div className="w-1.5 h-1.5 bg-green-500 animate-pulse rounded-full mr-1.5" />
                                        Active
                                    </Badge>) : (<Badge color="red" tone="outline">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5" />
                                        Inactive
                                    </Badge>)}</Table.Td>
                                </Table.Tr>


                            ))}
                        </Table.Tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default OrdersList