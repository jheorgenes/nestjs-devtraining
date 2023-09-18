import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddCoursesIdToCoursesTagsTable1695058442937 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionando a tabela courses_tags e o campo coursesId
    await queryRunner.addColumn(
      'courses_tags',
      new TableColumn({
        name: 'coursesId',
        type: 'uuid',
        isNullable: true
      })
    );
    // Adicionando o relacionamento de ForeignKey entre courses_tags e courses e chamando-o de courses_tags_courses
    await queryRunner.createForeignKey(
      'courses_tags', 
      new TableForeignKey({
        name: 'courses_tags_courses',
        columnNames: ['coursesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses'
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Deletando primeiro o relacionamento ForeignKey entre courses_tags e courses_tags_courses
    await queryRunner.dropForeignKey('courses_tags', 'courses_tags_courses');
    // Depois, deletando a coluna coursesId da tabela courses_tags
    await queryRunner.dropColumn('courses_tags', 'coursesId');
  }

}
