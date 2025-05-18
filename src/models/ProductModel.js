import { ObjectId } from "mongodb";
import { getDB } from "../database/database.js";

const collection = 'products'

export class ProductModel {
    static getCollection(){
        return getDB().collection(collection);
    }

    static async insert(product){
        const db = this.getCollection();
        return await db.insertOne(product);
    }

    static async findAll(){
        const db = this.getCollection();
        return await db.find({}).toArray();
    }

    static async findById(id){
        const db = this.getCollection();
        return await db.findOne({ _id: new ObjectId(id) });
    }

    static async findByName(name) {
        const db = this.getCollection();
        return await db.findOne({ name });
    }

    static async update(id, data){
        const db = this.getCollection();
        return await db.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
    }

    static async delete(id){
        const db = this.getCollection();
        return await db.deleteOne({ _id: new ObjectId(id) });
    }
}