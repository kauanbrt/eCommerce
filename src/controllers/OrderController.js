import { OrderService } from "../services/OrderService.js";

export class OrderController
{
    static async getAll(req, res)
    {
        try {
            const orders = await OrderService.getAll();
            res.status(200).json(orders);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async create(req, res)
    {
        try {
            const data = req?.body;
            const id = await OrderService.insertOrder(data);
            res.status(201).json({ message: 'Pedido criado com sucesso', id });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async update(req, res)
    {
        try {
            const data = req?.body;
            const id = req?.params?.id;
            await OrderService.updateOrder(id, data);
            res.status(200).json({ message: 'Pedido atualizado com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async delete(req, res)
    {
        try {
            const id = req?.params?.id;
            await OrderService.deleteOrder(id);
            res.status(200).json({ message: 'Pedido removido com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}