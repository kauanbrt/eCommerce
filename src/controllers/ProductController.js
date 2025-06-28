import { ProductService } from "../services/ProductService.js";

export class ProductController
{
    static async getAll(req, res)
    {
        try {
            const products = await ProductService.getAll();
            res.status(200).json(products);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async create(req, res)
    {
        try {
            const data = req?.body;
            const id = await ProductService.insertProduct(data);
            res.status(201).json({ message: 'Produto criado com sucesso', id });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async update(req, res)
    {
        try {
            const data = req?.body;
            const id = req?.params?.id;
            await ProductService.updateProduct(id, data);
            res.status(200).json({ message: 'Produto atualizado com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    static async delete(req, res)
    {
        try {
            const id = req?.params?.id;
            await ProductService.deleteProduct(id);
            res.status(200).json({ message: 'Produto removido com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}