import { ProductModel } from '../models/ProductModel.js';
import { logError } from '../logs/logError.js';

export class ProductService {
    static validate(product) {
        const requiredFields = ['name', 'price', 'amount'];
        for(const field of requiredFields){
            if(!product[field]){
                throw new Error(`Campo obrigatório "${field}" não foi preenchido.`);
            }
        }
    }

    static async insertProduct(product){
        try {
            this.validate(product);
            const result = await ProductModel.insert(product);
            return result.insertedId;
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    static async getAll(){
        try {
            return await ProductModel.findAll();
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    static async updateProduct(id, data){
        try {
            return await ProductModel.update(id, data);
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    static async deleteProduct(id){
        try {
            return await ProductModel.delete(id);
        } catch (err) {
            logError(err);
            throw err;
        }
    }
}