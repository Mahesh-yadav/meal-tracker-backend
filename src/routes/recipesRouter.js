import express from 'express';
import Recipe from '../models/Recipe';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { search = '' } = req.query;

  try {
    const recipes = await Recipe.searchRecipes(search);
    res.json(recipes);
  } catch (error) {
    next(error);
  }
});

export default router;
