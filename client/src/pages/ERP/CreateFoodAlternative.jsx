import React, { useEffect, useState } from 'react';
import { useFood } from '../../context/FoodContext';
import { useIngredient } from '../../context/IngredientContext';

const CreateFoodAlternative = () => {
  const { foods, getFoods, createFood } = useFood();
  const { ingredients, getIngredients } = useIngredient();
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [ingredientQuantity, setIngredientQuantity] = useState({});

  useEffect(() => {
    const fetchIngredients = async () => {
      await getIngredients();
    };
    const fetchFoods = async () => {
      await getFoods();
    };
    fetchIngredients();
    fetchFoods()
    console.log(foods)
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedIngredients((prevSelected) => ({ ...prevSelected, [name]: checked }));
  };

  const handleQuantityChange = (e) => {
    const { name, value } = e.target;
    setIngredientQuantity((prevQuantity) => ({
      ...prevQuantity,
      [name]: value ? parseFloat(value) : 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the data to be sent to the backend
    const data = {
      name,
      description,
      price,
      ingredients: Object.entries(selectedIngredients).map(([ingredientId, checked]) => ({
        _id: ingredientId,
        quantity: checked ? parseFloat(ingredientQuantity[ingredientId]) || 0 : 0,
      })),
    };
    console.log(data);

    createFood(data)
  };

  // State para el formulario
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  return (
    <>
      <div>
        {ingredients.map((ingredient) => (
          <div className='flex gap-x-2 my-2 w-1/2' key={ingredient._id}>
            <input
              type='checkbox'
              name={ingredient._id}
              id={ingredient._id}
              checked={selectedIngredients[ingredient._id] || false}
              onChange={handleCheckboxChange}
            />
            <p>{ingredient.name}</p>
            <input
              type='number'
              name={ingredient._id}
              value={ingredientQuantity[ingredient._id] || ''}
              onChange={handleQuantityChange}
              className='text-black'
            />
          </div>
        ))}

        <div>
          <label className='block font-bold mb-1'>Name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md'
          />
        </div>
        <div>
          <label className='block font-bold mb-1'>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md'
          />
        </div>
        <div>
          <label className='block font-bold mb-1'>Price:</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md'
          />
        </div>
        <button
          onClick={handleSubmit}
          className='bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600'
        >
          Save
        </button>
      </div>
      <div>
      <div>
        {
          foods.map((food)=> (
            <div>
              <p> {food.name} </p>
              <p> {food.price} </p>
              {food.ingredients.map(ingredient=> (
                <div>
                  <p>{ingredient._id}</p>
                  <p> {ingredient.quantity} </p>
                </div>
              ))
              }
            </div>
          ))
        }
      </div>
      </div>
    </>
  );
};

export default CreateFoodAlternative;