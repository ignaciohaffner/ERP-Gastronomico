import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useFood } from '../../context/FoodContext'
import { useIngredient } from '../../context/IngredientContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Combobox } from '@rewind-ui/core'

const CreateFood = () => {

    const { register, handleSubmit, setValue } = useForm()
    const { createFood, getFood, updateFood, getFoods, foods } = useFood()
    const { ingredients, getIngredients } = useIngredient()
    const navigate = useNavigate()
    const params = useParams()

    const [selectIngredients, setSelectIngredients] = useState([])


    useEffect(() => {
        async function loadFood() {
            if (params.id) {
                const food = await getFood(params.id)
                console.log(food)
                setValue('name', food.name)
                setValue('description', food.description)
                setValue('price', food.price)
            } else {
                getFoods()
            }

        }
        loadFood()
        getIngredients()
    }, []);


    const onSubmit = handleSubmit((data) => {

        if (params.id) {
            updateTask(params.id, data)
            // navigate('/tasks')
        } else {
            createFood(data)
            // navigate('/tasks')
        }
    })

    const [selectedIngredient, setSelectedIngredient] = useState(""); // Cambiar el estado a una sola variable para el ingrediente seleccionado

  // ...otros códigos...

  const handleAddIngredient = (e) => {
    e.preventDefault();

    if (!selectedIngredient) {
      // Si no se ha seleccionado un ingrediente, no hacer nada
      return;
    }

    // Obtén el ingrediente seleccionado en el Combobox
    const ingredient = ingredients.find(
      (ingredient) => ingredient.name === selectedIngredient
    );

    // Agrega el nuevo ingrediente seleccionado a la lista de selectedIngredients
    setSelectIngredients((prevIngredients) => [
      ...prevIngredients,
      {
        name: ingredient.name,
        quantity: 0,
      },
    ]);

    // Limpiar el estado selectedIngredient después de seleccionar un ingrediente
    setSelectedIngredient("");
  };

  useEffect(() => {
    // Este useEffect se ejecutará cada vez que selectIngredients cambie
    console.log(selectIngredients);
  }, [selectIngredients]);


    return (
        <>
            <div className='flex gap-5'>
                {
                    foods.map(food => (
                        <div className='border-2 p-2' key={food._id}>
                            <p>{food.name}</p>
                            <p>{food.price}</p>
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

                        <label htmlFor="description">Description</label>
                        <textarea rows="3" placeholder='Description' {...register('description')}
                            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' ></textarea>

                        <label htmlFor="Price">Price</label>
                        <input type="number" placeholder='Price' {...register('price')}
                            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
                        
                        <label htmlFor="">Selecciona los ingredientes a agregar.</label>
                        <div className='flex'>
                        <Combobox
        placeholder="Select a fruit..."
        onChange={(e) => setSelectedIngredient(e.target.value)} // Actualizar el estado selectedIngredient al seleccionar un ingrediente
        value={selectedIngredient} // Agregar el valor al Combobox
      >
        {ingredients.map((ingredient) => (
          <Combobox.Option
            key={ingredient._id}
            value={ingredient.name}
            label={ingredient.name}
          />
        ))}
      </Combobox>
      <button
        className="bg-green-500 px-3 py-1 rounded ml-1"
        onClick={handleAddIngredient}
      >
        +
      </button>

                        </div>
                        
                        <button className=' bg-indigo-500 px-3 mt-5 py-2 rounded-md '>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </>



    )
}

export default CreateFood