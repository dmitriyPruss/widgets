import { MigrationParams, RunnableMigration } from 'umzug/lib/types';
import { MigrationContext } from '../utility-types';

export class AlterWidgetsTableRenameColumn20230131005425 implements RunnableMigration<MigrationContext> {
  public name = '20230131005425.AlterWidgetsTableRenameColumn';

  public async up(params: MigrationParams<MigrationContext>): Promise<void> {
    const {
			context: { queryRunner },
		} = params;

		await queryRunner.renameColumn('widgets', 'streamId', 'channelId');
  }

  public async down(params: MigrationParams<MigrationContext>): Promise<void> {
    const {
			context: { queryRunner },
		} = params;

		await queryRunner.renameColumn('widgets', 'channelId', 'streamId');
  }
}
