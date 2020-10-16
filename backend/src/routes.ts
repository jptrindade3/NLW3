/*
    Rota = conjunto
    Recurso = usuário

    Métodos HTTP = GET, POST, PUT DELETE
    Parâmetros

    GET = Buscar uma informação
    POST = Criando uma informação
    PUT = Editando uma informação
    DELETE = Deletando uma informação

    Query Params - Serve para fazermos buscas: http://localhost:3333/users?search=diego
    req.query

    Route Params - Serve para passarmos uma informação sobre o nosso recurso (identificação): http://localhost:3333/users/:id
    req.body

    Body Params - Serve para enviar informações mais complexas, como formulários: http://localhost:3333/users
    req.body

    devemos adicionar um campo no ormconfig chamado entities
    para que possamos integrar as classes às tabelas do banco
*/

import {Router} from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig); //chamamos aqui as configurações que fizemos no arquivo de uploads e vamos utilizar elas nas rotas desejadas

routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show); //utilizamos a nossa const upload para se preparar pra receber vários arquivos (imagens nesse caso) e passamos o nome do campo por onde enviaremos os arquivos como parâmetro

export default routes;