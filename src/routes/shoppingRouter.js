import express from 'express';
import Meal from '../models/Meal';
import Ingredient from '../models/Ingredient';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const ingredients = await Ingredient.getIngredients();
    const meals = await Meal.getPopulatedMeals();

    const futureMeals = meals.filter((meal) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const mealDate = new Date(meal.planned_date);

      return mealDate > yesterday;
    });

    const requiredIngredients = futureMeals.flatMap(
      (meal) => meal.recipe.ingredients
    );

    const requiredIngredientsNames = [
      ...new Set(requiredIngredients.map((ingredient) => ingredient.name)),
    ].map((ingredientName) => ingredientName.toLowerCase());

    const missingIngredients = requiredIngredientsNames.filter(
      (ingredientName) =>
        !ingredients.some((ingredient) => ingredient.name === ingredientName)
    );

    res.json(missingIngredients);
  } catch (error) {
    next(error);
  }
});

export default router;
