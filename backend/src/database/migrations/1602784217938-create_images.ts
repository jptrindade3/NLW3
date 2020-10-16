import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602784217938 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "images",
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },

                {
                    name: 'path',
                    type: 'varchar', //caminho da aimagem salva no banco
                },

                {
                    name: 'orphanage_id',
                    type: 'integer', //a qual orpfanato a imagem está associada
                },
            ],
            foreignKeys: [
                {
                    name: 'ImageOrphanage', //Nome que damos para essa chave estrangeira
                    columnNames: ['orphanage_id'], //Coluna da tabela nativa que queremos preencher com dados estrangeiros
                    referencedTableName: 'orphanages',//Tabela estrangeira de interesse
                    referencedColumnNames: ['id'],//Coluna da tabela estrangeira com os dados de interesse
                    onUpdate: 'CASCADE',//essa opção cascade garante que, caso alteremos o valor da id de um orfanato, ele também atualizará o id relacionado nas imagens
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
