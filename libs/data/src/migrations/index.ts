import { InputMigrations } from 'umzug';
import { MigrationContext } from '../utility-types';
import { CreateUsersTable20220114133300 } from './20220114133300.CreateUsersTable';
import { CreateStreamsTable20230118145608 } from './20230118145608.CreateStreamsTable';
import { CreateWidgetsTable20230120171731 } from './20230120171731.CreateWidgetsTable';
import { AlterStreamsTableRenameTableToChannels20230130235651 } from './20230130235651.AlterStreamsTableRenameTableToChannels';
import { AlterWidgetsTableRenameColumn20230131005425 } from './20230131005425.AlterWidgetsTableRenameColumn';
// --imports_section_end

const migrationsList: InputMigrations<MigrationContext> = [
  new CreateUsersTable20220114133300(),
  new CreateStreamsTable20230118145608(),
	new CreateWidgetsTable20230120171731(),
	new AlterStreamsTableRenameTableToChannels20230130235651(),
	new AlterWidgetsTableRenameColumn20230131005425(),
// --migrations_list_end
];

export default migrationsList;
