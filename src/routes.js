import express from 'express';

const router = express.Router();

// importação do middleware de autenticação
// import { isAuthenticated } from './middleware/auth.js';

// importação dos controllers
import * as userController from './controllers/userController.js';
import * as signinController from './controllers/signinController.js';

// Rotas de usuário
router.post('/users', userController.create);
router.get('/users', userController.readAll);
router.get('/users/:id', userController.read);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.remove);

// Rota de autenticação
router.post('/signin', signinController.signin);


export default router;
