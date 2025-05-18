import { CustomerService } from "../services/CustomerService.js";
import { URL } from 'url';

export class CustomerController {
    static async handle(req, res){

        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const path = parsedUrl.pathname;

        // GET /customers
        if (req.method === 'GET' && path === '/customers') {
            try {
                const customers = await CustomerService.getAll();
                res.writeHead(200);
                res.end(JSON.stringify(customers));
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            }
        }

        // POST /customers
        else if (req.method === 'POST' && path === '/customers') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                try {
                    const data = JSON.parse(body);
                    const id = await CustomerService.insertCustomer(data);
                    res.writeHead(201);
                    res.end(JSON.stringify({ message: 'Cliente criado com sucesso', id }));
                } catch (err) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: err.message }));
                }
            });
        }

        // PUT /customers/:id
        else if (req.method === 'PUT' && path.startsWith('/customers/')) {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                const id = path.split('/')[2];
                try {
                    const data = JSON.parse(body);
                    await CustomerService.updateCustomer(id, data);
                    res.writeHead(200);
                    res.end(JSON.stringify({ message: 'Cliente atualizado com sucesso' }));
                } catch (err) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: err.message }));
                }
            });
        }

        // DELETE /customers/:id
        else if (req.method === 'DELETE' && path.startsWith('/customers/')) {
            const id = path.split('/')[2];
            try {
                await CustomerService.deleteCustomer(id);
                res.writeHead(200);
                res.end(JSON.stringify({ message: 'Cliente removido com sucesso' }));
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