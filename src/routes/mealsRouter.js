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
