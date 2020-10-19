import axios from 'axios';

/*
    É por meio desse arquivo que iremos conectar o nosso front
    end com o back, para pegar as informações que estão rodando
    por lá. Por isso é importante que nós utilizemos o cors e
    também é necessário que o back esteja rodando
*/

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;