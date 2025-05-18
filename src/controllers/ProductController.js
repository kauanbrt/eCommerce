import { ProductService } from "../services/ProductService.js";
import { URL } from 'url';

export class ProductController {
    static async handle(req, res){

        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const path = parsedUrl.pathname;

        // GET /products
        if (req.method === 'GET' && path === '/products') {
            try {
                const products = await ProductService.getAll();
                res.writeHead(200);
                res.end(JSON.stringify(products));
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            }
        }

        // POST /products
        else if (req.method === 'POST' && path === '/products') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                try {
                    const data = JSON.parse(body);
                    const id = await ProductService.insertProduct(data);
                    res.writeHead(201);
                    res.end(JSON.stringify({ message: 'Produto criado com sucesso', id }));
                } catch (err) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: err.message }));
                }
            });
        }

        // PUT /products/:id
        else if (req.method === 'PUT' && path.startsWith('/products/')) {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                const id = path.split('/')[2];
                try {
                    const data = JSON.parse(body);
                    await ProductService.updateProduct(id, data);
                    res.writeHead(200);
                    res.end(JSON.stringify({ message: 'Produto atualizado com sucesso' }));
                } catch (err) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: err.message }));
                }
            });
        }

        // DELETE /products/:id
        else if (req.method === 'DELETE' && path.startsWith('/products/')) {
            const id = path.split('/')[2];
            try {
                await ProductService.deleteProduct(id);
                res.writeHead(200);
                res.end(JSON.stringify({ message: 'Produto removido com sucesso' }));
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            }
        }

        // Not Found
        else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Rota não encontrada.' }));
        }
    }
}