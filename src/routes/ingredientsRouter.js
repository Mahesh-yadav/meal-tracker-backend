import express from 'express';
import Ingredient from '../models/Ingredient';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const ingredients = await Ingredient.getIngredients();

    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
});

router.delete('/:ingredientId', async (req, res, next) => {
  try {
    const { ingredientId } = req.params;
    await Ingredient.deleteIngredient(ingredientId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
