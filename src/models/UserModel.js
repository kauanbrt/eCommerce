import { ObjectId } from "mongodb";
import { getDB } from "../database/database.js";

const collection = 'users'

export class UserModel {
    static getCollection(){
        return getDB().collection(collection);
    }

    static async insert(user){
        const db = this.getCollection();
        return await db.insertOne(user);
    }

    //retorna todos os usuarios, excluindo o campo de senha
    static async findAll(){
        const db = this.getCollection();
        return await db.find({}, { projection: { password: 0 } }).toArray();
    }

    static async findByEmail(email) {
        const db = this.getCollection();
        return await db.findOne({ email }, { projection: { password: 0 } });
    }

    static async findById(id){
        const db = this.getCollection();
        return await db.findOne({ _id: new ObjectId(id) });
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