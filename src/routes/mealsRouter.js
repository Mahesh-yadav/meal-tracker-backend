import express from 'express';
import Meal from '../models/Meal';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const meals = await Meal.getPopulatedMeals();

    res.status(200).json(meals);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { date, recipeId } = req.body;
  const newMeal = {
    recipeId,
    planned_date: date,
  };

  try {
    const insertedMealId = await Meal.insertMeal(newMeal);
    res.status(201).json({
      ...newMeal,
      _id: insertedMealId,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:mealId', async (req, res, next) => {
  try {
    const { mealId } = req.params;
    await Meal.deleteMeal(mealId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
