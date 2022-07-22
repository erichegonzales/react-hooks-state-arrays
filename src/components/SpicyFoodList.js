import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
    const [foods, setFoods] = useState(spicyFoods);
    const [cuisine, setCuisine] = useState('All')

    function handleAddFood() {
        const newFood = getNewRandomSpicyFood();
        // spread operator to make a copy of the array and add an element to it
        const newFoodArray = [...foods, newFood]
        setFoods(newFoodArray)
    }

    function handleRemoveFood(id) {
        // filter method to make a copy of the array and remove an element from it
        const newFoodArray = foods.filter((food) => food.id !== id)
        setFoods(newFoodArray)
    }

    function handleUpdateFood(id, heatLevel) {
        // map method to make a copy of the array and update an element in it
        // explanation of how the map method words: https://bobbyhadz.com/blog/react-update-object-in-array
        const newFoodArray = foods.map((food) => {
            if (food.id === id) return {...food, heatLevel: heatLevel + 1}
            else return food
        })
        setFoods(newFoodArray)
    }

    function handleChange(event) {
        // event.target.value is the current cuisine
        // setting the state of the current cuisine to the the one chosen
        setCuisine(event.target.value)
    }

    // copy of new array grouped by cuisine type
    const foodsByCuisine = foods.filter((food) => {
            // returning true means to keep the element in the copy of the array
            if (cuisine === 'All') return true
            // the cuisine type of the current food item must be equal to the current cuisine state
            // in order to return true and stay in the copy of the array
            else return food.cuisine === cuisine
        })

    // map through the copy of the array with the chosen cuisine type
    const foodList = foodsByCuisine.map((food) => (
        // adds an onClick event handler and passes in the food item being clicked on
        <li key={food.id} >
            {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
            <button onClick={() => { handleUpdateFood(food.id, food.heatLevel) }}>↑</button>
            <button onClick={() => { handleRemoveFood(food.id) }}>x</button>
        </li>
    ));

    return (
        <div>
            <select name="filter" onChange={(event) => { handleChange(event) }}>
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