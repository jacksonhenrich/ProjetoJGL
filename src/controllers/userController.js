import CryptPassword from '../lib/hash.js';
import User from '../models/User.js';

// Criar um novo usuário
export async function create(req, res) {
    try {
        const user = req.body;
        // Verifica se o usuário já existe
        const userExists = await User.readByEmail(user.email);

        if (userExists) {
            throw new Error('Usuário já existe');
        }

        // Criptografa a senha
        const hash = await CryptPassword.hashPassword(user.senha);

        // Cria o usuário
        const newUser = await User.create({
            ...user,
            senha: hash
        });

        // Retorna o usuário criado
        res.status(201).json({
            message: 'Usuário criado com sucesso',
            user: newUser
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Listar todos os usuários
export async function readAll(req, res) {

    try {
        const users = await User.readAll();

        res.status(201).json({
            message: 'Listagem de usuários',
            users
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Listar um usuário
export async function read(req, res) {

    try {
        const { id } = req.params;

        const user = await User.read(id);

        res.json(user);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Atualizar um usuário
export async function update(req, res) {

    try {
        const { id } = req.params;

        const user = req.body;

        // Verifica se o usuário já existe
        const userExists = await User.read(id);

        if (!userExists) {
            throw new Error('Usuário não encontrado');
        }

        // Criptografa a senha
        const hash = await bcrypt.hash(user.senha, 12);

        user.senha = hash;

        // Atualiza o usuário
        const newUser = await User.update(user, id);

        // Retorna o usuário atualizado
        res.json({
            message: 'Usuário atualizado com sucesso',
            user: newUser
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Remover um usuário
export async function remove(req, res) {

    try {
        const { id } = req.params;

        // Verifica se o usuário já existe
        const userExists = await User.read(id);

        if (!userExists) {
            throw new Error('Usuário não encontrado');
        }

        // Remove o usuário
        await User.remove(id);

        // Retorna o usuário atualizado
        res.json({
            message: 'Usuário removido com sucesso'
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
