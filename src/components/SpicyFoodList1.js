import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  // sets a state to change the list of spicy foods
  const [foods, setFoods] = useState(spicyFoods);
  // sets a state that filters the kind of cuisine
  const [filterBy, setFilterBy] = useState('All')

  // creates a new food array with an added item using the spread operatory
  const handleAddFood = () => {
    const newFood = getNewRandomSpicyFood();
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
  }

  // increases the heat level of a food when it is clicked on
  // creates a new array using the map method
  const handleLiClick = (id, heatLevel) => {
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  // saves the value of the cuisine drop down option
  // calls the function to change the state 
  const handleFilterChange = (event) => {
    setFilterBy(event.target.value)
  }

  // changes the state of the food list based on the option chosen
  // creates a new array from the previous food array with only the foods of the cuisine chosen
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === 'All') return true
    else return food.cuisine === filterBy
  })

  // creates an li element of a food item
  // uses the map array method to iterate through food items
  // creates a copy of the foodsToDisplay array
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => {handleLiClick(food.id, food.heatLevel)}}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    // dropdown menu of cuisine type, button to add new food, and unordered list to list foods
    <div>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
