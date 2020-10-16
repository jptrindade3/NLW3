import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602773894492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        /*
            é pelo método up que fazemos alterações nas tabelas, 
            como criar uma tabela, um novo campo na tabela ou deletar
            algum campo 
         */
        await queryRunner.createTable(new Table({
            name: "orphanages",
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true, //coluna com número sempre positivo
                    isPrimary: true,//torna essa coluna como a identificadora, a coluna chave dessa tabela
                    isGenerated: true,//Essa coluna é gerada automaticamente
                    generationStrategy: 'increment'// o valor do ide será gerado pela incrementação em relação ao ide da ultima tabela criada
                },

                {
                    name: 'name',
                    type: 'varchar', //campo string "curto", até mais de 200 chars
                },

                {
                    name: 'latitude',
                    type: 'decimal', //float
                    scale: 10, //quantidade de números depois da virgula
                    precision: 2,//quantidade de números antes da virgula
                },

                {
                    name: 'longitude',
                    type: 'decimal', //float
                    scale: 10,
                    precision: 2
                },

                {
                    name: 'about',
                    type: 'text',
                },

                {
                    name: 'instructions',
                    type: 'text',
                },

                {
                    name: 'opening_hours',
                    type: 'varchar',
                },

                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false,//Valor padrão desse campo quando criado
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        /*
            A ideia do método down é fazer o contrário do up, ou
            seja, se fizermos algo pelo up e quisermos desfazer, 
            utilizamos o down
        */
       await queryRunner.dropTable('orphanages');
    }

}
// npx typeorm migration:create -n create_images -d src/database/migrations
// npm run typeorm migration:run
// npm run typeorm migration:revert
