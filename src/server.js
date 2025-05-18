import http from 'http';
import { connectDB } from './database/database.js';
const PORT = 3000;

import { ProductController } from './controllers/ProductController.js';
// import { CustomerController } from './controllers/CustomerController.js';
// import { OrderController } from './controllers/OrderController.js';

async function startServer(){
    try{
        await connectDB();

        const server = http.createServer((req, res) => {
            res.setHeader('Content-type', 'application/json');
            
            if(req.url.startsWith('/products')){
                ProductController.handle(req, res);
            } else if (req.url.startsWith('/customers')){
                // CustomerController.handle(req, res);
            } else if (req.url.startsWith('/orders')){
                // OrderController.handle(req, res);
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'Rota não encontrada.' }));
            }
        })
        
        server.listen(PORT, () => {
            console.log('Server is running on port: ', PORT)
        });

    } catch (err) {
        console.log('Erro ao startar servidor: ', err);
    }
}


startServer();