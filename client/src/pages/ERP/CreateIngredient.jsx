import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useIngredient } from '../../context/IngredientContext'
import { useNavigate, useParams } from 'react-router-dom'

const CreateIngredient = () => {

    const { register, handleSubmit, setValue } = useForm()
    const { createIngredient, getIngredient, updateIngredient, getIngredients, ingredients } = useIngredient()
    const navigate = useNavigate()
    const params = useParams()


    useEffect(() => {
        async function loadIngredient() {
            if (params.id) {
                const ingredient = await getIngredient(params.id)
                console.log(ingredient)
                setValue('name', ingredient.name)
                setValue('quantity', ingredient.quantity)
                setValue('price', ingredient.price)
            } else {
                getIngredients()
            }

        }
        loadIngredient()
    }, []);


    const onSubmit = handleSubmit((data) => {

        if (params.id) {
            updateTask(params.id, data)
            // navigate('/tasks')
        } else {
            createIngredient(data)
            // navigate('/tasks')
        }
    })

    return (
        <>
            <div className='flex gap-5'>
                {
                    ingredients.map(food => (
                        <div className='border-2 p-2' key={food._id}>
                            <p>{food.name}</p>
                            <p>Cantidad: {food.quantity}</p>
                            <p>${food.price}</p>
                        </div>

                    ))
                }
            </div>
            <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
                <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                    <form onSubmit={onSubmit}>
                        <label htmlFor="Name">Name</label>
                        <input type="text" placeholder='Name' {...register('name')}
                            autoFocus
                            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />

                        <label htmlFor="Quantity">Quantity</label>
                        <input type="number" placeholder='Quantity' {...register('quantity')}
                            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />

                        <label htmlFor="Price">Price</label>
                        <input type="number" placeholder='Price' {...register('price')}
                            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />

                        <button className=' bg-indigo-500 px-3 py-2 rounded-md '>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </>



    )
}

export default CreateIngredient