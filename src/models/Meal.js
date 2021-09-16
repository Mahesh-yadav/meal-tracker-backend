import { ObjectId } from 'mongodb';
import { db } from '../db/connection';
import Recipe from './Recipe';

export default class Meal {
  static collectionName = 'meals';

  static async getMeals() {
    const database = db.getDB();
    const meals = await database
      .collection(Meal.collectionName)
      .find({})
      .toArray();

    return meals;
  }

  static async getPopulatedMeals() {
    const meals = await Meal.getMeals();
    const recipes = await Recipe.getRecipes();

    const populatedMeals = meals.map((meal) => {
      return {
        ...meal,
        recipe: recipes.find((recipe) => recipe.id === meal.recipeId),
      };
    });

    return populatedMeals;
  }

  static async insertMeal(meal) {
    const database = db.getDB();
    const result = await database
      .collection(Meal.collectionName)
      .insertOne(meal);

    return result.insertedId;
  }

  static async deleteMeal(mealId) {
    const database = db.getDB();
    await database.collection(Meal.collectionName).deleteOne({
      _id: ObjectId(mealId),
    });
  }
}
