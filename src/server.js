import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';

import { listWifis } from "./lib/wifi.js";

// Configurações Varaiveis de ambiente
config();

// Importações de rotas
import './routes.js';
import router from './routes.js';

// Configurações do Express
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(router);

app.get('/wifis', async (req, res) => {
    const wifis = await listWifis();

    res.json(wifis);
});


// Inicialização do servidor
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
