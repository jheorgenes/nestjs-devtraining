import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddTagsIdToCoursesTagsTable1695059656973 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionando a tabela courses_tags e o campo tagsId
    await queryRunner.addColumn(
      'courses_tags',
      new TableColumn({
        name: 'tagsId',
        type: 'uuid',
        isNullable: true
      })
    );
    // Adicionando o relacionamento de ForeignKey entre courses_tags e tags e chamando-o de courses_tags_tags
    await queryRunner.createForeignKey(
      'courses_tags', 
      new TableForeignKey({
        name: 'courses_tags_tags',
        columnNames: ['tagsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags'
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Deletando primeiro o relacionamento ForeignKey entre courses_tags e courses_tags_tags
    await queryRunner.dropForeignKey('courses_tags', 'courses_tags_tags');
    // Depois, deletando a coluna coursesId da tabela courses_tags
    await queryRunner.dropColumn('courses_tags', 'tagsId');
  }

}
