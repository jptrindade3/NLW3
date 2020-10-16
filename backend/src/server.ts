
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
import routes from './routes';
import './database/connection';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);