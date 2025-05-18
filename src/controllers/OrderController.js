import { OrderService } from "../services/OrderService.js";
import { URL } from 'url';

export class OrderController {
    static async handle(req, res){

        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const path = parsedUrl.pathname;

        // GET /orders
        if (req.method === 'GET' && path === '/orders') {
            try {
                const orders = await OrderService.getAll();
                res.writeHead(200);
                res.end(JSON.stringify(orders));
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            }
        }

        // POST /orders
        else if (req.method === 'POST' && path === '/orders') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                try {
                    const data = JSON.parse(body);
                    const id = await OrderService.insertOrder(data);
                    res.writeHead(201);
                    res.end(JSON.stringify({ message: 'Pedido criado com sucesso', id }));
                } catch (err) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: err.message }));
                }
            });
        }

        // PUT /orders/:id
        else if (req.method === 'PUT' && path.startsWith('/orders/')) {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                const id = path.split('/')[2];
                try {
                    const data = JSON.parse(body);
                    await OrderService.updateOrder(id, data);
                    res.writeHead(200);
                    res.end(JSON.stringify({ message: 'Pedido atualizado com sucesso' }));
                } catch (err) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: err.message }));
                }
            });
        }

        // DELETE /orders/:id
        else if (req.method === 'DELETE' && path.startsWith('/orders/')) {
            const id = path.split('/')[2];
            try {
                await OrderService.deleteOrder(id);
                res.writeHead(200);
                res.end(JSON.stringify({ message: 'Pedido removido com sucesso' }));
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