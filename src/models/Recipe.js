import { db } from '../db/connection';

export default class Recipe {
  static collectionName = 'recipes';

  static async getRecipes() {
    const database = db.getDB();
    const recipes = await database
      .collection(Recipe.collectionName)
      .find({})
      .toArray();

    return recipes;
  }
}
