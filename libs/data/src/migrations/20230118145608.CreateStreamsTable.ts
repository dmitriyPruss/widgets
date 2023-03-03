import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { Table } from 'typeorm';
import { MigrationContext } from '../utility-types';


export class CreateStreamsTable20230118145608 implements RunnableMigration<MigrationContext> {
  public name = '20230118145608.CreateStreamsTable';

  public async up(params: MigrationParams<MigrationContext>): Promise<void> {
	const { context: { queryRunner } } = params;

	await queryRunner.createTable(new Table({
	  name: 'streams',
	  columns: [
		{
		  name: 'id',
		  type: 'uuid',
		  isPrimary: true,
		  isGenerated: true,
		  generationStrategy: 'uuid'
		},
		{
		  name: 'name',
		  type: 'text',
		  isUnique: true,
		  isNullable: false
		},
		{
		  name: 'key',
		  type: 'text',
		  isUnique: true,
		  isNullable: false
		},
		{
		  name: 'ingestEndpoint',
		  type: 'text',
		  isNullable: false
		},
		{
		  name: 'playbackURL',
		  type: 'text',
		  isNullable: false
		},
		{
		  name: 'ARN',
		  type: 'text',
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
  }

  public async down(params: MigrationParams<MigrationContext>): Promise<void> {
	const { context: { queryRunner } } = params;

	await queryRunner.dropTable('streams');
  }
}
