import { AuthService } from "../services/AuthService.js";
import { UserService } from "../services/UserService.js";
import bcrypt from 'bcryptjs';

export class AuthController 
{
    static async login(req, res)
    {
        try {
            const { email, password } = req.body;
            
            if(!email || !password) return res.status(401).send('Os campos Email e Senha são obrigatórios!');

            const user = await UserService.getByEmail(email);
            if (!user) return res.status(401).send('Email não cadastrado no sistema!');

            console.log(user)
    
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) return res.status(401).send('Credenciais inválidas!');
    
            const token = await AuthService.generateToken(user);
    
            res.status(200).json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token
            });
    
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async verifyToken(req, res)
    {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido!' });
        }
    
        const decoded = await AuthService.verifyToken(token);
    
        if (decoded) {
            res.status(200).json({ message: 'Usuário autenticado no sistema!', user: decoded });
        } else {
            res.status(401).json({ message: 'Usuário não autenticado no sistema!' });
        }
    };
}