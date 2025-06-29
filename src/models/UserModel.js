import { ObjectId } from "mongodb";
import { getDB } from "../database/database.js";

const collection = 'users'

export class UserModel {
    //retorna a colecao de usuarios do banco
    static getCollection(){
        return getDB().collection(collection);
    }

    //cadastra um novo usuario
    static async insert(user){
        const db = this.getCollection();
        return await db.insertOne(user);
    }

    //retorna todos os usuarios, excluindo o campo de senha
    static async findAll(){
        const db = this.getCollection();
        return await db.find({}, { projection: { password: 0 } }).toArray();
    }

    //retorna o usuario pelo email
    static async findByEmail(email) {
        const db = this.getCollection();
        return await db.findOne({ email });
    }

    //retorna o usuario pelo id
    static async findById(id){
        const db = this.getCollection();
        return await db.findOne({ _id: new ObjectId(id) });
    }

    //atualiza o usuario
    static async update(id, data){
        const db = this.getCollection();
        return await db.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
    }

    //deleta o usuario
    static async delete(id){
        const db = this.getCollection();
        return await db.deleteOne({ _id: new ObjectId(id) });
    }
}