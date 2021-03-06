import { db } from '../db/connection';
import { ObjectId } from 'mongodb';

export default class Ingredient {
  static collectionName = 'ingredients';

  static async getIngredients() {
    const database = db.getDB();
    const ingredients = await database
      .collection(Ingredient.collectionName)
      .find({})
      .toArray();

    return ingredients;
  }

  static async insertIngredient(ingredient) {
    const database = db.getDB();
    const result = await database
      .collection(Ingredient.collectionName)
      .insertOne(ingredient);

    return result.insertedId;
  }

  static async deleteIngredient(ingredientId) {
    const database = db.getDB();
    await database.collection(Ingredient.collectionName).deleteOne({
      _id: ObjectId(ingredientId),
    });
  }
}
