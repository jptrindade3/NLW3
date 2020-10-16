/*
    Por meio de classes nós iremos operar o nosso banco de dados,
    sendo que esse arquivo não precisa ter os mesmos tipos que as
    colunas do banco de dados, só tipos parecidos, porque ele não 
    tem relação direta com  o banco. 
    Para que o código funcione direitinho, temos que fazer algumas
    alterações no tsconfig, mudando a strictPropertyInitialization
    de true pra false (e descomentando), além de descomentar também
    as propriedades experimentalDecorators e emitDecoratorMetadata.
    Com esses decorators, estaremos sinalizando para o banco que
    essa classe pode ser entendida como uma tabela na hora de utilizar
    os dados enviados
    Caso houvesse algo nessa classe que não deve ser enviado ao banco,
    bastaria que não colocassemos esses decorators nessas propriedades
    indesejadas ao banco que elas não seriam enviadas.
*/


import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm'
import Image from './Images';

@Entity('orphanages')//sinaliza essa entidade como tabela
export default class Orphanage{
    @PrimaryGeneratedColumn('increment')//sinaliza essa coluna como primaria e incremental
    id: number;

    @Column()//sinaliza essa coluna como coluna padrão
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @OneToMany(() => Image, image => image.orphanage, { 
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'orphanage_id'})
    images: Image[];
}

/*
    Queremos relacionar um orfanato a várias imagens usando o 
    decorator oneToMany. Nele passamos como parâmetro uma função
    que tem como retorno o Model com o qual se relaciona (Image,
    que importamos pra esse arquivo), e passamos também uma outra
    variável, que irá nos apontar para a "coluna" do model associado
    (image) de onde queremos pegar a informação
    Com o metodo JoinColumn referenciamos a coluna que é responsável
    por ligar uma tabela à outra
    O método cascade serve para permitir a atualização automática das
    informações relacionadas entre as tabelas para que elas não
    tenham problemas de se desconectar uma da outra
*/
