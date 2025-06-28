import { UserModel } from '../models/UserModel.js';
import { logError } from '../logs/logError.js';

export class UserService {
    
    //Valida os campos obrigatorios
    static validate(user) {
        const requiredFields = ['name', 'email', 'password'];
        for(const field of requiredFields){
            if(!user[field]){
                throw new Error(`Campo obrigatório "${field}" não foi preenchido.`);
            }
        }
    }

    //Cadastra um novo usuario
    static async insertUser(user){
        try {
            //Valida os campos obrigatorios
            this.validate(user);

            //Valida se já existe usuario com o mesmo email
            const existing = await UserModel.findByEmail(user.email);
            if (existing) {
                throw new Error('Email já cadastrado no sistema.');
            }

            //todo chamar classe de servico auth para criptografar a senha

            const result = await UserModel.insert(user);
            return result.insertedId;
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    //Recupera todos os usuarios
    static async getAll(){
        try {
            return await UserModel.findAll();
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    //Atualiza o usuario
    static async updateUser(id, data){
        try {
            return await UserModel.update(id, data);
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    //Deleta o usuario
    static async deleteUser(id){
        try {
            return await UserModel.delete(id);
        } catch (err) {
            logError(err);
            throw err;
        }
    }
}