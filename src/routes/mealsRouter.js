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

export default router;
