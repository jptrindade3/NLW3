import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import Orphanage from './Orphanages';

@Entity('images')//sinaliza essa entidade como tabela
export default class Image{
    @PrimaryGeneratedColumn('increment')//sinaliza essa coluna como primaria e incremental
    id: number;

    @Column()//sinaliza essa coluna como coluna padrão
    path: string;

    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({name: 'orphanage_id'})
    orphanage: Orphanage;
}

/*
    No orfanato fizemos a relação de um pra muitos, agora, com
    as imagens, devemos fazer a relação de muitos pra um, com o
    mesmo raciocínio que fizemos no model de orphanage
*/