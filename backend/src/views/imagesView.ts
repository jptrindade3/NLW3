import Image from './../models/Images';

export default {
    render(image: Image){
        return {
            id: image.id,
            url: `http://localhost:3333/uploads/${image.path}`,
        };
    },

    renderMany(images: Image[]){
        return images.map(image => this.render(image));//chamando o metodo render único várias vezes para todos os orfanatos
    }
}