import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterStreamsTableRenameTableToChannels20230130235651 implements RunnableMigration<MigrationContext> {
  public name = '20230130235651.AlterStreamsTableRenameTableToChannels';

  public async up(params: MigrationParams<MigrationContext>): Promise<void> {
	  const { context: { queryRunner } } = params;

    await queryRunner.renameTable('streams', 'channels');
  }

  public async down(params: MigrationParams<MigrationContext>): Promise<void> {
	  const { context: { queryRunner } } = params;

    await queryRunner.renameTable('channels', 'streams');
  }
}
