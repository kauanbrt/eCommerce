import { OrderModel } from '../models/OrderModel.js';
import { ProductModel } from '../models/ProductModel.js';
import { logError } from '../logs/logError.js';

export class OrderService {
    
    //Valida os campos obrigatorios
    static validate(order) {
        const requiredFields = ['product_id', 'customer_id', 'amount'];
        for(const field of requiredFields){
            if(!order[field]){
                throw new Error(`Campo obrigatório "${field}" não foi preenchido.`);
            }
        }
    }

    //Cadastra um novo pedido
    static async insertOrder(order){
        try {
            //Valida os campos obrigatorios
            this.validate(order);

            //Valida se o Cliente ja possui pedido em aberto
            const openOrder = await OrderModel.findOpenByCustomer(order.customer_id);
            if(openOrder){
                throw new Error('O Cliente já possui um pedido em aberto.');
            }

            //Valida existencia do produto
            const product = await ProductModel.findById(order.product_id);
            if (!product) {
                throw new Error('Produto não encontrado.');
            }
            
            //Valida o estoque
            if (product.amount < order.amount) {
                throw new Error('Estoque insuficiente para o pedido.');
            }

            //Calcula o preço final
            order.price = product.price * order.amount;

            //Cria o pedido
            const result = await OrderModel.insert(order);

            //Atualiza o estoque
            await ProductModel.update(order.product_id, {
                amount: product.amount - order.amount
            });

            return result.insertedId;
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    //Recupera todos os pedidos
    static async getAll(){
        try {
            return await OrderModel.findAll();
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    //Atualiza o pedido
    static async updateOrder(id, data){
        try {
            return await OrderModel.update(id, data);
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    //Deleta o pedido
    static async deleteOrder(id){
        try {
            return await OrderModel.delete(id);
        } catch (err) {
            logError(err);
            throw err;
        }
    }
}