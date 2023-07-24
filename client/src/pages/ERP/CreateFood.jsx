import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useFood } from '../../context/FoodContext'
import { useNavigate, useParams } from 'react-router-dom'

const CreateFood = () => {

    const { register, handleSubmit, setValue } = useForm()
    const { createFood, getFood, updateFood, getFoods } = useFood()
    const navigate = useNavigate()
    const params = useParams()


    useEffect(() => {
        async function loadFood() {
            if (params.id) {
                const task = await getFood(params.id)
                console.log(food)
                setValue('name', food.name)
                setValue('description', food.description)
            } else {
                getFoods()
            }

        }
        loadFood()
    }, []);


    const onSubmit = handleSubmit((data) => {

        if (params.id) {
            updateTask(params.id, data)
            // navigate('/tasks')
        } else {
            createTask(data)
            // navigate('/tasks')
        }
    })

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>

            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <label htmlFor="Name">Name</label>
                    <input type="text" placeholder='Name' {...register('name')}
                        autoFocus
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
                    <label htmlFor="description">Description</label>
                    <textarea rows="3" placeholder='Description' {...register('description')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' ></textarea>
                    <button className=' bg-indigo-500 px-3 py-2 rounded-md '>
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateFood