import Orphanage from './../models/Orphanages';
import imagesView from './imagesView';

export default {
    render(orphanage: Orphanage){
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imagesView.renderMany(orphanage.images)
        };
    },

    renderMany(orphanages: Orphanage[]){
        return orphanages.map(orphanage => this.render(orphanage));//chamando o metodo render único várias vezes para todos os orfanatos
    }
}
/*
    A ideia desses arquivos no view e trabalhar os dados que o 
    back end retorna para que eles sejam utilizáveis da forma
    que queremos no front. pra isso, utilizamos o metodo render
    Agora, vamos utilizar esses metodos criados no nosso controller
    que traz dados ao front. Ao invés de renderizarmos diretamente
    aquilo que vem no banco pelo return dos nossos metodos dos
    controllers, vamos chamar o view pra decidir quais dados aparecem
    e passar esses dados pelo return dos métodos do controller
*/