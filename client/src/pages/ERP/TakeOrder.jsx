import React, { useEffect } from 'react'
import { Button } from '@rewind-ui/core'
import { useFood } from '../../context/FoodContext'
import foodModel from '../../../../src/models/food.model'

const TakeOrder = () => {

   const  { foods, getFoods } = useFood()

   useEffect(() => {
     getFoods()
   }, [])
   

  return (
    <>  
    <div className='bg-zinc-700 h-full'>
        <h1 className='text-center text-3xl text-bold'>Tomar pedido</h1>
        <div className=' flex flex-row justify-between mt-5'>
            
            <div className='flex flex-row w-4/6 m-5 flex-wrap items-center   gap-5'>
                <div className='border-2 rounded h-20 w-20 text-center my-auto'>cheese <br /> burger</div>
                {
                    foods.map(food => (
                        <div key={food._id}  className='border-2 rounded h-20 w-20 text-center my-auto'>
                            <p>{food.name}</p>
                        </div>
                    ))
                }
            </div>
            <div className='flex flex-col mx-auto'>
                <div>
                    <h1 className='text-center text-bold text-2xl'>Resumen de pedido</h1>
                </div>
                <div className=''>
                    <ol start='1'>
                        <li>1 - Cheeseburger</li>
                        <li>5 - porongas</li>
                        <li>1 - Cheeseburger</li>
                        <li>5 - porongas</li>
                        <li>1 - Cheeseburger</li>
                        <li>5 - porongas</li>

                    </ol>
                </div>
                <div className='border-2'>
                    <p className='text-center text-bold'>Checkout</p>
                    <p>Total: $8888</p>
                    <div className='flex justify-center gap-x-5 mt-5 '>
                        <Button>Confirmar</Button>
                        <Button>Cancelar</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default TakeOrder