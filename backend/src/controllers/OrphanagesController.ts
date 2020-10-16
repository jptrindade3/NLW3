import {Request, Response} from 'express';//Aqui entra aa tipagem do TS, precisamos tipar o req e o res para eles saberem o que esperar
import {getRepository} from 'typeorm';//precisa desse componente pra gerenciar as trocas com o banco de dados
import Orphanage from '../models/Orphanages';//modelo base para ser utilizado nas tabelas

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
        })

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
        
        return res.json(orphanages);
    },

    async show(req:Request, res:Response){
        const {id} = req.params;

        const orphanageRepository = getRepository(Orphanage);

        const orphanage = await orphanageRepository.findOneOrFail(id, {
            relations: ['images'],
        });//Ou encontramos o que queremos ou vai dar erro
        
        return res.json(orphanage);
    }
}