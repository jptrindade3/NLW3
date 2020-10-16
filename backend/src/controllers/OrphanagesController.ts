import {Request, Response} from 'express';//Aqui entra aa tipagem do TS, precisamos tipar o req e o res para eles saberem o que esperar
import {getRepository} from 'typeorm';//precisa desse componente pra gerenciar as trocas com o banco de dados
import Orphanage from '../models/Orphanages';//modelo base para ser utilizado nas tabelas
import orphanageView from '../views/orphanagesView';
import * as Yup from 'yup';//precisa baixar as tipagens pro TS e uma importação diferente como podemos ver

export default {
    async create(req:Request, res:Response){
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body; //pega as informações do corpo da requisição
    
        const orphanageRepository = getRepository(Orphanage);//cria um meio de operar a classe/entidade Orphanage que criamos no model
        
        const requestImages = req.files as Express.Multer.File[]; //Fazemos isso para forçar o TS a entender que isso é um array de arquivos
        const images = requestImages.map(image => {
            return {path: image.filename}
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),//dentro do escopo do required, podemos colocar uma string com a mensagem de error que queremos retornar quando ele não for atingido
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false, //com o true, ele vai retornar erro no primeiro que vier errado, mas queremos que ele tente todos e nos envie todos os erros no final, e não só o primeiro
        });

        const orphanage = orphanageRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });//cria a tabela com base nas informações que escolhemos
        
        await orphanageRepository.save(orphanage);//salva a tabela criada no banco de dados
    
        return res.status(201).json(orphanage);
    },

    async index(req:Request, res:Response){
        const orphanageRepository = getRepository(Orphanage);

        const orphanages = await orphanageRepository.find({
            relations: ['images'],//Como as imagens são chaves estrangeiras, temos que as chamar dessa maneira
        });//deixamos aqui vazio pois não queremos filtrar nem nada, só queremos pegar tudo, e existem outros metodos além do find para serem utilizados aqui
        
        return res.json(orphanageView.renderMany(orphanages));
    },

    async show(req:Request, res:Response){
        const {id} = req.params;

        const orphanageRepository = getRepository(Orphanage);

        const orphanage = await orphanageRepository.findOneOrFail(id, {
            relations: ['images'],
        });//Ou encontramos o que queremos ou vai dar erro
        
        return res.json(orphanageView.render(orphanage));
    }
}

/*
    O yup é uma dependencia de validação de dados, ou sejam, a 
    partir dele, definimos os tipos de dados que esperamos em 
    cada uma das nossas instâncias sendo enviadas ao backend e,
    caso o que esteja sendo enviado seja diferente daquilo que
    estamos esperando, ele retorna um erro de validação pra nosso
    usuário
*/