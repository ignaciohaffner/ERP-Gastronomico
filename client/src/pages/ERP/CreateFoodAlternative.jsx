import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useIngredient } from '../../context/IngredientContext';

const CreateFoodAlternative = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientQuantity, setIngredientQuantity] = useState({});
  const [availableIngredients, setAvailableIngredients] = useState([]);

  const {ingredients, getIngredients} = useIngredient()

  useEffect(() => {
    // Fetch available ingredients from the backend
    const fetchIngredients = async () => {
      getIngredients()
      setAvailableIngredients(ingredients)
      console.log(ingredients)
    };

    fetchIngredients();
    console.log(ingredientsList)

  }, []);

  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setIngredientQuantity((prevQuantity) => ({ ...prevQuantity, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the data to be sent to the backend
    const data = {
      name,
      description,
      price,
      ingredients: ingredientsList.map((ingredient) => ({
        name: ingredient,
        quantity: parseFloat(ingredientQuantity[ingredient]) || 0,
      })),
    };

    try {
      // Send the data to the backend to create the new food
      const response = await axios.post('/api/foods', data);
      console.log('Food created:', response.data);
      // Reset the form fields after successful submission
      setName('');
      setDescription('');
      setPrice('');
      setIngredientsList([]);
      setIngredientQuantity({});
      // Optionally, you can navigate to a different page after successful submission
      // For example, navigate to a page displaying the newly created food details
      // navigate('/foods/' + response.data._id);
    } catch (error) {
      console.error('Error creating food:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Select Ingredients and Quantity:</label>
          {availableIngredients.map((ingredient) => (
            <div key={ingredient._id} className="flex items-center">
              <input
                type="checkbox"
                name={ingredient.name}
                checked={ingredients.includes(ingredient.name)}
                onChange={(e) => {
                  const { name, checked } = e.target;
                  if (checked) {
                    setIngredientsList((prevIngredients) => [...prevIngredients, name]);
                  } else {
                    setIngredientsList((prevIngredients) => prevIngredients.filter((item) => item !== name));
                  }
                }}
                className="mr-2"
              />
              <span>{ingredient.name}:</span>
              <input
                type="number"
                value={ingredientQuantity[ingredient.name] || ''}
                onChange={handleIngredientChange}
                name={ingredient.name}
                className="w-16 ml-2 bg-gray-100 text-gray-800 px-2 py-1 rounded-md"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateFoodAlternative;
