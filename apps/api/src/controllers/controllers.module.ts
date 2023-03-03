import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { UsersController } from './users.controller';
import { HealthController } from './health.controller';
import { ChannelsController } from './channels.controller';
import { WidgetsController } from './widgets.controller';
import { ServicesModule } from '../services/services.module';


@Module({
  imports: [
    TerminusModule,
    ServicesModule,
  ],
  controllers: [
    UsersController,
    ChannelsController,
		WidgetsController,
    HealthController
  ],
})
export class ControllersModule {}
