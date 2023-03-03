import { Table, TableColumn, TableForeignKey } from 'typeorm';
import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class CreateWidgetsTable20230120171731 implements RunnableMigration<MigrationContext> {
  public name = '20230120171731.CreateWidgetsTable';

  public async up(params: MigrationParams<MigrationContext>): Promise<void> {
	const { context: { queryRunner } } = params;

	await queryRunner.createTable(new Table({
	  name: 'widgets',
	  columns: [
		{
		  name: 'id',
		  type: 'uuid',
		  isPrimary: true,
		  isGenerated: true,
		  generationStrategy: 'uuid'
		},
		{
		  name: 'title',
		  type: 'text',
		  isUnique: true,
		  isNullable: false
		},
		{
		  name: 'url',
		  type: 'text',
		  isNullable: false
		},
		{
		  name: 'price',
		  type: 'numeric',
		  isNullable: false
		},
		{
		  name: 'startX',
		  type: 'smallint',
		  isNullable: false
		},
		{
		  name: 'startY',
		  type: 'smallint',
		  isNullable: false
		},
		{
		  name: 'createdAt',
		  type: 'timestamp',
		  isNullable: false
		},
		{
		  name: 'updatedAt',
		  type: 'timestamp',
		  isNullable: true
		}
	  ]
    }));

	await queryRunner.addColumn(
	  'widgets',
	  new TableColumn({
		name: 'streamId',
		type: 'uuid'
	  })
	);

	await queryRunner.createForeignKey(
	  'widgets',
	  new TableForeignKey({
		columnNames: ['streamId'],
		referencedColumnNames: ['id'],
		referencedTableName: 'streams',
		onDelete: 'CASCADE'
	  })
	);
  }

  public async down(params: MigrationParams<MigrationContext>): Promise<void> {
	const { context: { queryRunner } } = params;

	await queryRunner.dropTable('widgets');
  }
}
