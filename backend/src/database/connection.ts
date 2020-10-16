import {createConnection} from 'typeorm';

createConnection();

// /*
//     O que estamos fazendo aqui é utilizando um ORM para 
//     trabalharmos com o banco sqlite. Existem 3 níveis de
//     abstração para o trabalho com um banco, o banco nativo,
//     um Query Builder e um ORM, sendo eles menos abstratos 
//     nessa mesma ordem.
//     Dessa maneira é possível escrevermos nossas queries de 
//     maneira mais intuitiva, e podemos a qualquer momento trocar
//     o banco de dados que estamos utilizando sem mudar o código,
//     se esse banco for suportado pelo ORM ou Query Builder
//     Pra utilizar esse ORM, tivemos que criar o arquivo ormconfig.json
//     e esse daqui mesmo, que será chamado no server.ts. Vamos adicionar
//     um comando pra utilizar o TS ao invés do JS pra rodar o typeorm
// */