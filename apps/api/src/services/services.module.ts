import { Module } from '@nestjs/common';
import { DatabaseModule, User, Channel, Widget } from '@boilerplate/data';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { ChannelsService } from './channels.service';
import { AuthService } from './auth.service';
import { WidgetsService } from './widgets.service';
import { EventsService } from './events.service';
import { WidgetsSocketEventsService } from './events/widgets-socket.events';
import { ClientIvsService } from './client-ivs.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guard/jwt.guard';
import { LocalStrategy } from './strategy/local.strategy';
import { jwtConstants } from '../constants';
import { ConfigService } from '@nestjs/config';
import { SocketModule } from '../socket/socket.module';
import { SocketGateway } from '../socket/socket.gateway';


@Module({
  imports: [
	DatabaseModule.forFeature([User, Channel, Widget]),
	PassportModule,
	JwtModule.register({
	  secret: jwtConstants.secret,
	  signOptions: {
	    expiresIn: jwtConstants.expiresIn
	  }
	})
  ],
  providers: [
	ConfigService,
    UsersService,
	AuthService,
	WidgetsService,
	WidgetsSocketEventsService,
	EventsService,
	ChannelsService,
	ClientIvsService,
	JwtAuthGuard,
	JwtStrategy,
	LocalStrategy,
	SocketModule,
	SocketGateway
  ],
  exports: [
    UsersService,
	AuthService,
	ChannelsService,
	WidgetsService,
	WidgetsSocketEventsService,
	EventsService,
	ClientIvsService
  ]
})

export class ServicesModule {}
