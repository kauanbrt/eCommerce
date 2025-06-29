import jwt from 'jsonwebtoken';

export class AuthService
{
    static async generateToken(user)
    {
        const secret = process.env.TOKEN_SECRET || 'secret';

        const data = {
            id: user.id,
            name: user.name,
        }

        const now = new Date().getTime() / 1000;

        const payload = {
            exp: now + 1800,
            iat: now,
            data: data,
        }

        const token = jwt.sign(data, secret, { expiresIn: '1d' });
        return token;
    }

    static async verifyToken(token = null)
    {
        const secret = process.env.TOKEN_SECRET || 'secret';
    
        if (!token) return false;
    
        try {
            const decoded = jwt.verify(token, secret);
            return decoded || false;
        } catch (error) {
            return false;
        }
    };

}