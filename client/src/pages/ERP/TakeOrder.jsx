import React, { useState, useEffect } from 'react'
import { Button, Select, Input, Checkbox } from '@rewind-ui/core'
import { useFood } from '../../context/FoodContext'
import { useOrder } from '../../context/OrderContext'

const TakeOrder = () => {

    const { foods, getFoods } = useFood()
    const { orders, createOrder } = useOrder()
    const [cartItems, setCartItems] = useState([])
    const [amount, setAmount] = useState(0)
    const [paymentType, setPaymentType] = useState('Efectivo'); // Estado para mantener el valor del método de pago
    const [showInput, setShowInput] = useState(false)
    const [clientName, setClientName] = useState('')
    const [deliveryAddress, setDeliveryAddress] = useState('')


    useEffect(() => {
        getFoods()
    }, [])

    const addToCart = (food) => {
        setCartItems([...cartItems, food]);
        setAmount(amount + food.price)
        console.log(cartItems);
    };

    const removeFromCart = (product) => {
        const productIndex = cartItems.findIndex(item => item._id === product._id);
        if (productIndex !== -1) {
            const newCartItems = [...cartItems];
            if (newCartItems[productIndex].quantity > 1) {
                newCartItems[productIndex].quantity--;
            } else {
                newCartItems.splice(productIndex, 1);
            }
            setCartItems(newCartItems);
            setAmount(prevAmount => prevAmount - product.price);
        }
    };

    const getProductCount = (productId) => {
        return cartItems.reduce((count, item) => {
            return item._id === productId ? count + 1 : count;
        }, 0);
    };

    const submitOrder = () => {
        const orderData = {
            paymentType: paymentType,
            amount: amount,
            articles: cartItems,
            deliveryAddress: deliveryAddress,
            customerName: clientName,
        }
        createOrder(orderData)
        console.log(orderData)
    }

    return (
        <>
            <div className='bg-zinc-700 h-full'>
                <h1 className='text-center text-3xl text-bold'>Tomar pedido</h1>
                <div className=' flex flex-row justify-between mt-5'>

                    <div className='flex flex-row w-1/2 m-5 flex-wrap items-center   gap-5'>
                        {
                            foods.map(food => (
                                <button onClick={() => addToCart(food)}>
                                    <div key={food._id} className='border-2 rounded h-20 w-20 text-center flex flex-col justify-center'>
                                        <p>{food.name}</p>
                                        <p>${food.price}</p>
                                    </div>
                                </button>

                            ))
                        }
                    </div>
                    <div className='flex flex-col mx-auto px-5'>
                        <div>
                            <h1 className='text-center text-bold text-2xl'>Resumen de pedido</h1>
                        </div>
                        <div className='mt-2'>
                            <ol start='1'>
                                {Array.from(new Set(cartItems.map(item => item._id))).map(productId => {
                                    const product = cartItems.find(item => item._id === productId);
                                    const count = getProductCount(productId);
                                    return (
                                        <div key={productId} className='flex items-center justify-between mt-2'>
                                            <li>{count} - {product.name} — ${product.price}</li>
                                            <button className='ml-5 px-1 bg-red-500 text-white font-bold rounded' onClick={() => removeFromCart(product)}>X</button>
                                        </div>
                                    );
                                })}
                            </ol>
                        </div>
                        <div className='border-2 mt-5 p-2'>
                            <p className='text-center text-bold'>CHECKOUT</p>
                            <p>Total: ${amount} ARS</p>
                            <p>Selecciona metodo de pago</p>
                            <Select size='sm' tone='solid' withRing={false} value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                                <option value='Efectivo'>Efectivo</option>
                                <option value='Debito/Credito'>Debito/Credito</option>
                                <option value='Mercado Pago'>Mercado Pago</option>
                            </Select>
                            <Input className='mt-3' placeholder='Nombre del cliente' type="text" onChange={(e) => setClientName(e.target.value)} />
                            <div className='flex'>
                                <Checkbox label="" color='gray' withRing={false} className='text-white' onClick={() => {
                                    setShowInput(!showInput)
                                    console.log(showInput)
                                }} />
                                <p>Delivery</p>
                            </div>
                            <Input placeholder='Direccion' type="text" className={showInput ? 'block' : 'hidden'} onChange={(e) => setDeliveryAddress(e.target.value)}></Input>

                            <div className='flex justify-center gap-x-6 mt-5 mb-2 '>
                                <Button className='bg-green-500 text-white font-bold rounded' onClick={submitOrder}>Confirmar</Button>
                                <Button className='bg-red-500 text-white font-bold rounded'>Cancelar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TakeOrder