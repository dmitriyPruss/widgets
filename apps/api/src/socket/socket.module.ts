import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SocketGateway } from './socket.gateway';
import { ServicesModule } from '../services/services.module';


@Module({
  imports: [
	  forwardRef(() => ServicesModule), ConfigModule
  ],
  providers: [SocketGateway],
  exports: [SocketGateway]
})

export class SocketModule {}