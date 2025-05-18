import { MongoClient } from "mongodb";

const URL = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(URL);
let db;

export async function connectDB(){
    await client.connect();
    db = client.db('ecommerce');
    console.log('Connected at MongoDB');
}

export function getDB(){
    if (!db) throw new Error("MongoDB not connected");
    return db;
}