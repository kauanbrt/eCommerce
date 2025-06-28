import { CustomerService } from "../services/CustomerService.js";

export class CustomerController
{
    static async getAll(req, res)
    {
        try {
            const customers = await CustomerService.getAll();
            res.status(200).json(customers);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async create(req, res)
    {
        try {
            const data = req?.body;
            const id = await CustomerService.insertCustomer(data);
            res.status(201).json({ message: 'Cliente criado com sucesso', id });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async update(req, res)
    {
        try {
            const data = req?.body;
            const id = req?.params?.id;
            await CustomerService.updateCustomer(id, data);
            res.status(200).json({ message: 'Cliente atualizado com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async delete(req, res)
    {
        try {
            const id = req?.params?.id;
            await CustomerService.deleteCustomer(id);
            res.status(200).json({ message: 'Cliente removido com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}