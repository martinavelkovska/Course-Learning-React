import { useEffect, useState } from "react";
import { fetchMeals } from "../https";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {}; // we only create the object once, to avoid infinite loops
export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []); // [] for the first time we won't output any items but also we won't fail

  console.log(loadedMeals);

  // const [loadedMeals, setLoadedMeals] = useState([]); /// the meals data will not be available instantly, initially they won't be there so we should manage them as  some state

  // useEffect(() => { moj naciin
  //   async function fetchAvailableMeals() {
  //     const allMeals = await fetchMeals();
  //     console.log(allMeals);
  //     setLoadedMeals(allMeals);
  //   }

  //   fetchAvailableMeals();
  // }, []);

  // useEffect(() => {
  //   async function fetchMeals() {
  //     const response = await fetch("http://localhost:3000/meals");

  //     const meals = await response.json(); //we need to extract data from json to js object

  //     //after loading those meals updete the loadedMeals
  //     setLoadedMeals(meals);
  //   }

  //   fetchMeals();
  // }, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  // if(!data){
  //   return <p>No meals found</p>
  // }

  return (
    <section>
      <ul id="meals">
        {loadedMeals &&
          loadedMeals.map((meal) => (
            // <li key={meal.id} className="meal-item">
            //   <h3>{meal.name}</h3>
            //   <img
            //     src={`http://localhost:3000/${meal.image}`}
            //     alt={meal.name}
            //   />

            //   <button>{meal.price}</button>
            //   <p>{meal.description}</p>
            // </li>
            <MealItem key={meal.id} meal={meal} />
          ))}
      </ul>
    </section>
  );
}
