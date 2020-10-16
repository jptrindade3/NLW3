import multer from 'multer';//Tambem precisa instalar os types pro ts
import path from 'path';//maneira de usar caminhos relativos na nossa aplicação (caminhops de diretórios)
/*
    O multer é uma dependencia que vai nos ajudar a fazer o manuseio
    dos arquivos para upload pro nosso sistema
    Ele pode ser utilizado em conjunto com várias provedoras do
    serviço de armazenagem de dados, como em algum cdn do amazon
    s3, google cloud storage (que precisam de extensões que são
    instaláveis), mas, hoje, vamos utilizar o nosso próprio computador
    para armazenar
*/
export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),//_dirname representa o diretório atual desse arquivo, e usamos '' no lugar de / porque win, mac e lin tem diferentes maneiras de indicar diretórios, e o path cuida disso pra a gente utilizando essa notação
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`; //Fazemos uma alteração no nome do arquivo para garantir que 2 pessoas não enviem arquivos com o mesmo nome e se sobrescrevam

            cb(null, fileName); //callback, uma função que recebe um erro como primeiro parâmetro(não tem erro no caso), e depois recebe o resultado que queremos como segundo parâmetro
        },
    })
}

/*
{
	"name": "Lar das meninas",
	"latitude": -19.8892432,
	"longitude": -43.9247093,
	"about": "sobre o orfanato",
	"instructions": "venha visitar",
	"opening_hours": "das 8h até as 18h",
	"open_on_weekends": true
}
*/