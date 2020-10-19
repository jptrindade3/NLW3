
/*  O node sozinho não entende typescript, então, pra isso
    precisamos instalar o typescript como dependencia de
    desenvolvimento (mpm install typescript -D) para que o
    node entenda typescript. Como instalamos o TS localmente
    (somente na aplicação e não na maquina toda com o -g),
    para criar o nosso arquivo de config ts, usamos o comando
    "npx tsc --init". Nele só mudamos o es5 para es2017, que 
    é a ultima versão completamente suportada pelo node
*/

/*
     Precisamos agora instalar o ts-node-dev -D para que a gente
     possa rodar o node sem problemas. será possível agora rodar
     o node usando TS
*/

/*
    Criamos a nossa estrutura de diretórios pensando no modelo
    MVC, que se baseia na divisão de diretórios de Models, Views
    e Controllers
*/

import express from 'express'; //O express tambem precisa do download dos types pra funcionar com o TS
import 'express-async-errors'; //Essa instalação do express-async-errors é importante, pois o express por conta própria não consegue identificar erros dentro de funções assincronas, e isso o ajuda. tem que ser chamado logo depois do express
import path from 'path';
import cors from 'cors';

import routes from './routes';
import errorHandler from './errors/handler';

import './database/connection';


const app = express();

app.use(cors());//Permite liberarmos o uso do backend vindo de diferentes domínios (os frontends estão em outros dominios) de maneira mais segura. o express por padrão é fechado ao acesso externo 
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); //Cria os links que permitem acessarmos as imagens via url
app.use(errorHandler);
app.use(express.json());

app.listen(3333);