import { ObjectId } from "mongodb";
import { getDB } from "../database/database.js";

const collection = 'customers'

export class CustomerModel {
    static getCollection(){
        return getDB().collection(collection);
    }

    static async insert(customer){
        const db = this.getCollection();
        return await db.insertOne(customer);
    }

    static async findAll(){
        const db = this.getCollection();
        return await db.find({}).toArray();
    }

    static async findById(id){
        const db = this.getCollection();
        return await db.findOne({ _id: new ObjectId(id) });
    }

    static async findByCPF(cpf) {
        const db = this.getCollection();
        return await db.findOne({ cpf });
    }

    static async findByEmail(email) {
        const db = this.getCollection();
        return await db.findOne({ email });
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