import { CustomerModel } from '../models/CustomerModel.js';
import { logError } from '../logs/logError.js';

export class CustomerService {
    static validate(customer) {
        const requiredFields = ['name', 'email', 'cpf'];
        for(const field of requiredFields){
            if(!customer[field]){
                throw new Error(`Campo obrigatório "${field}" não foi preenchido.`);
            }
        }
    }

    static async insertCustomer(customer){
        try {
            //Valida os campos obrigatorios
            this.validate(customer);

            //Valida se o CPF ja existe
            const existingCPF = await CustomerModel.findByCPF(customer.cpf);
            if (existingCPF) {
                throw new Error('CPF já cadastrado.');
            }

            // Valida se o email ja existe
            const existingEmail = await CustomerModel.findByEmail(customer.email);
            if (existingEmail) {
                throw new Error('E-mail já cadastrado.');
            }

            const result = await CustomerModel.insert(customer);
            return result.insertedId;
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    static async getAll(){
        try {
            return await CustomerModel.findAll();
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    static async updateCustomer(id, data){
        try {
            return await CustomerModel.update(id, data);
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    static async deleteCustomer(id){
        try {
            return await CustomerModel.delete(id);
        } catch (err) {
            logError(err);
            throw err;
        }
    }
}