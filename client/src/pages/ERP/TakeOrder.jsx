import React from 'react'
import { Button } from '@rewind-ui/core'

const TakeOrder = () => {
  return (
    <>  
    <div className='bg-zinc-700 h-full'>
        <h1 className='text-center text-3xl text-bold'>Tomar pedido</h1>
        <div className=' flex flex-row justify-between mt-5'>
            
            <div className='flex flex-row w-4/6 m-5 flex-wrap items-center   gap-5'>
                <div className='border-2 rounded h-20 w-20 text-center my-auto'>cheese <br /> burger</div>
                <div className='border-2 rounded h-20 w-20 text-center my-auto'  >doble <br /> cheese</div>
                <div className='border-2 rounded h-20 w-20 text-center my-auto' >clasica</div>
                <div className='border-2 rounded h-20 w-20 text-center my-auto' >clasica <br /> doble</div>
                <div className='border-2 rounded h-20 w-20 text-center my-auto' >bacon <br /> simple</div>
                <div className='border-2 rounded h-20 w-20 text-center my-auto' >bacon <br /> doble</div>
                <div className='border-2 rounded h-20 w-20 text-center my-auto' >garompa</div>
                <div className='border-2 rounded h-20 w-20 text-center my-auto' >garompa <br /> doble</div>
                <div className='border-2 rounded h-20 w-20 text-center my-auto' >bacon <br /> simple</div>
                <div className='border-2 rounded h-20 w-20 text-center my-auto' >bacon <br /> doble</div>
                <div className='border-2 rounded h-20 w-20 text-center my-auto' >garompa</div>
                <div className='border-2 rounded h-20 w-20 text-center my-auto' >garompa <br /> doble</div>
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