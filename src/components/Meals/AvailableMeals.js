import React, {useState, useEffect} from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);

    const fetchMenuHandler = async () => {
        try {
            const response = await fetch('https://react2-f5ff0-default-rtdb.europe-west1.firebasedatabase.app/DUMMY_MEALS.json');
            const data = await response.json();

            const transformedMeals = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));

            setMeals(transformedMeals);
        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    };

    useEffect(() => {
        fetchMenuHandler();
    }, []);

    const mealsList = meals.map(meal => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
