const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGO_DB_URL;
const client = new MongoClient(url, { useUnifiedTopology: true });

// Database Name
const dbName = process.env.DB_NAME;
class RecipeModel {
  static async findAll() {
    const collection = await RecipeModel.collection();
    return collection.find({}).toArray();
  }

  static async deleteById(id) {
    const oId = new ObjectId(id);
    const collection = await RecipeModel.collection();
    return collection.deleteOne({ _id: oId });
  }

  static async findById(id) {
    if (id.length !== 12 && id.length !== 24) {
      return undefined;
    }
    const oId = new ObjectId(id);
    const collection = await RecipeModel.collection();
    const recipe = await collection.find({ _id: oId }).toArray();

    return recipe[0];
  }

  static async insertOrUpdate(param) {
    try {
      const data = param;
      const oId = ObjectId(data.userId);
      const collection = await RecipeModel.collection();
      const id = data._id;
      delete data._id;

      const insertResult = id
        ? await collection.findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: { ...data, userId: oId } },
            { returnOriginal: false },
          )
        : await collection.insertOne({ ...data, userId: oId });
      const recipe = insertResult.ops ? { recipe: insertResult.ops[0] } : { ...insertResult.value };

      return recipe;
    } catch (error) {
      return { message: error };
    }
  }

  static async collection() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('recipes');
    return collection;
  }
}
module.exports = RecipeModel;
