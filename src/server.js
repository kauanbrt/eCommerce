import app from "./app.js";
import { connectDB } from './database/database.js';

const PORT = 3000;

async function startServer(){
    try{
        await connectDB();
        app.listen(PORT, () => {
            console.log(`eCommerce API está rodando na porta ${PORT}`);
        });
    } catch (err) {
        console.log('Erro ao startar servidor: ', err);
    }
}

startServer();