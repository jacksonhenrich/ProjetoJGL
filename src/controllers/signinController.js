import jwt from 'jsonwebtoken';
import CryptPassword from '../lib/hash.js';
import User from '../models/User.js';


// Método para autenticar o usuário
export async function signin(req, res) {
    try {
        const { email, senha } = req.body;

        // Verifica se o usuário existe
        const user = await User.readByEmail(email);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Verifica se a senha está correta
        const isValidPassword = await CryptPassword.comparePassword(senha, user.senha);

        if (!isValidPassword) {
            throw new Error('Senha inválida');
        }

        // Gera o token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
            algorithm: 'HS256'
        });

        // Retorna o token
        res.json({
            auth: true,
            token
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
