import { ProductModel } from '../models/ProductModel.js';
import { logError } from '../logs/logError.js';

export class ProductService {
    
    //Valida os campos obrigatorios
    static validate(product) {
        const requiredFields = ['name', 'price', 'amount'];
        for(const field of requiredFields){
            if(!product[field]){
                throw new Error(`Campo obrigatório "${field}" não foi preenchido.`);
            }
        }
    }

    //Cadastra um novo produto
    static async insertProduct(product){
        try {
            //Valida os campos obrigatorios
            this.validate(product);

            //Valida se já existe produto com o mesmo nome
            const existing = await ProductModel.findByName(product.name);
            if (existing) {
                throw new Error('Já existe um produto com este nome.');
            }

            // Valida tipo e valor do preço
            if (typeof product.price !== 'number' || product.price <= 0) {
                throw new Error('Preço inválido. Deve ser um número maior que zero.');
            }

            // Valida tipo e valor do estoque
            if (!Number.isInteger(product.amount) || product.amount < 0) {
                throw new Error('Estoque inválido. Deve ser um número inteiro positivo ou zero.');
            }

            const result = await ProductModel.insert(product);
            return result.insertedId;
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    //Recupera todos os produtos
    static async getAll(){
        try {
            return await ProductModel.findAll();
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    //Atualiza o produto
    static async updateProduct(id, data){
        try {
            return await ProductModel.update(id, data);
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    //Deleta o produto
    static async deleteProduct(id){
        try {
            return await ProductModel.delete(id);
        } catch (err) {
            logError(err);
            throw err;
        }
    }
}