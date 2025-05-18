import { ObjectId } from "mongodb";
import { getDB } from "../database/database.js";

const collection = 'orders'

export class OrderModel {

    static STATUS_OPEN = 'open';
    static STATUS_CLOSED = 'closed';
    
    static getCollection(){
        return getDB().collection(collection);
    }

    static async insert(order){
        const db = this.getCollection();
        return await db.insertOne({
            ...order,
            status: this.STATUS_OPEN
        });
    }

    static async findAll(){
        const db = this.getCollection();
        return await db.find({}).toArray();
    }

    static async findOpenByCustomer(customerId) {
        const db = this.getCollection();
        return await db.findOne({
            customer_id: customerId,
            status: this.STATUS_OPEN
        });
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