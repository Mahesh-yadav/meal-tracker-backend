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

router.post('/', async (req, res, next) => {
  try {
    const ingredient = req.body;
    const insertedId = await Ingredient.insertIngredient(ingredient);

    if (insertedId) {
      res.status(201).json({ ...ingredient, _id: insertedId });
    } else {
      throw new Error('Failed to insert ingredient');
    }
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
