import { UserService } from "../services/UserService.js";

export class UserController
{
    static async getAll(req, res)
    {
        try {
            const users = await UserService.getAll();
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async create(req, res)
    {
        try {
            const data = req?.body;
            const id = await UserService.insertUser(data);
            res.status(201).json({ message: 'Usuário criado com sucesso', id });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async update(req, res)
    {
        try {
            const data = req?.body;
            const id = req?.params?.id;
            await UserService.updateUser(id, data);
            res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async delete(req, res)
    {
        try {
            const id = req?.params?.id;
            await UserService.deleteUser(id);
            res.status(200).json({ message: 'Usuário removido com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}