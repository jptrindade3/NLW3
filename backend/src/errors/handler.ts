import {ErrorRequestHandler} from 'express';
import {ValidationError} from 'yup';

interface ValidationErrors { //Estamos definindo o formato que queremos retornar um erro, seu nome e todos os erros que podem ser contidos dentro dele
    [key: string]: string[];
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    
    if(error instanceof ValidationError){ //Vamos ver se o nosso erro é um erro de validação ou outro tipo pra diferenciar o tratamento e resposta que daremos 
        let errors: ValidationErrors = {};

        error.inner.forEach(err => { //estamos percorrendo o error.inner que vem no console log e vamos retornar o conteúdo do erro de maneira mais amigável ao usuário
            errors[err.path] = err.errors
        });

        return res.status(400).json({message: 'Validation fails', errors})
    }
    
    console.error(error);
    return res.status(500).json({message: 'Server internal error'});
};

export default errorHandler;

/*
    Aqui estamos fazendo com que os erros se tornem mais legíveis
    e organizados no nosso sistema. utilizamos uma tipagem própria
    do express para formatar o erro, mandamos o erro pro nosso
    console log, mas só enviamos uma mensagem de erro ao usuário,
    de forma que ele não será capaz de ver qual é o erro, só 
    saber que deu erro
    Podemos diferenciar os erros que acontecem aqui também, e vamos
    diferenciar os erros de validação dos demais erros utilizando
    o Yup
*/