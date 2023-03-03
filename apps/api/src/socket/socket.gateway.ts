import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { 
  ConnectedSocket, 
  MessageBody, 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  OnGatewayInit, 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer 
} from '@nestjs/websockets';
import { SocketEnum, WidgetDto } from '@boilerplate/shared';
import { EventsService } from '../services/events.service';
import { WidgetsService } from '../services/widgets.service';


@WebSocketGateway({ namespace: '/api', transports: ['websocket', 'polling'], cors: true })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private static readonly logger = new Logger('SocketGateway');

  @WebSocketServer()
  private readonly server: Server;

  private readonly userRoomPrefix = 'user-';
  private readonly playerRoomPrefix = 'player-';
  private readonly widgetsRoomPrefix = 'widgets-';

  private readonly visibleWidgetsRoomPrefix = 'visible-widgets-';
  private readonly purchasedWidgetsRoomPrefix = 'purchased-widgets-';

  constructor(
	  private readonly eventsService: EventsService,
    private readonly widgetsService: WidgetsService
  ) {}

  // Player 
  @SubscribeMessage(SocketEnum.JoinPlayer)
  async onClientJoinAmazonIVSPlayer(
	  @MessageBody('id') id: string, @ConnectedSocket() client: Socket
  ): Promise<void> {
    const playerRoom = this.generatePlayerRoom(id);

    client.join(playerRoom);

    SocketGateway.logger.log(`User ${id} is joined to room ${playerRoom}`);
  }

  @SubscribeMessage(SocketEnum.LeftPlayer)
  async onClientLeftAmazonIVSPlayer(
    @MessageBody('id') id: string, 
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const playerRoom = this.generatePlayerRoom(id);
      
    client.leave(playerRoom);

    SocketGateway.logger.warn(`User ${id} is leaved room ${playerRoom}`);
  }


  // Widgets
  @SubscribeMessage(SocketEnum.JoinWidgets)
  async onClientJoinWidgets(
    @MessageBody('id') id: string, 
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const widgetsRoom = this.generateWidgetsRoom(id);

    client.join(widgetsRoom);

    SocketGateway.logger.log(`User ${id} is joined to room ${widgetsRoom}`);
  }

  @SubscribeMessage(SocketEnum.LeftWidgets)
  async onClientLeftWidgets(
    @MessageBody('id') id: string, 
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const widgetsRoom = this.generateWidgetsRoom(id);

    client.leave(widgetsRoom);

    SocketGateway.logger.warn(`User ${id} is leaved room ${widgetsRoom}`);
  }

  @SubscribeMessage(SocketEnum.ReceivedWidgets)
  async onReceiveWidgets(
    @MessageBody() data: WidgetDto[]
  ): Promise<void> {
    this.eventsService.emitWidgets(data || []);
  }

  // Show visible widgets 
  @SubscribeMessage(SocketEnum.JoinVisibleWidgets)
  async onClientJoinVisibleWidgets(
    @MessageBody('id') id: string, 
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const visibleWidgetsRoom = this.generateVisibleWidgetsRoom(id);

    client.join(visibleWidgetsRoom);

    SocketGateway.logger.log(`User ${id} is joined to room ${visibleWidgetsRoom}`);
  }

  @SubscribeMessage(SocketEnum.LeftVisibleWidgets)
  async onClientLeftVisibleWidgets(
    @MessageBody('id') id: string, 
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const visibleWidgetsRoom = this.generateVisibleWidgetsRoom(id);

    client.leave(visibleWidgetsRoom);

    SocketGateway.logger.warn(`User ${id} is leaved room ${visibleWidgetsRoom}`);
  }

  @SubscribeMessage(SocketEnum.ReceivedVisibleWidgets)
  async onReceiveVisibleWidgets(
    @MessageBody() data: string[]
  ): Promise<void> {
    const widgets = await this.widgetsService.showVisibleWidgets(data);

    this.eventsService.emitVisibleWidgets(widgets);
  }


 // Buying widgets
 @SubscribeMessage(SocketEnum.JoinPurchasedWidgets)
 async onClientJoinPurchasedWidgets(
   @MessageBody('id') id: string, 
   @ConnectedSocket() client: Socket
 ): Promise<void> {
   const purchasedWidgetsRoom = this.generatePurchasedWidgetsRoom(id);

   client.join(purchasedWidgetsRoom);

   SocketGateway.logger.log(`User ${id} is joined to room ${purchasedWidgetsRoom}`);
 }

 @SubscribeMessage(SocketEnum.LeftPurchasedWidgets)
 async onClientLeftPurchasedWidgets(
   @MessageBody('id') id: string, 
   @ConnectedSocket() client: Socket
 ): Promise<void> {
   const purchasedWidgetsRoom = this.generatePurchasedWidgetsRoom(id);

   client.leave(purchasedWidgetsRoom);

   SocketGateway.logger.warn(`User ${id} is leaved room ${purchasedWidgetsRoom}`);
 }

 @SubscribeMessage(SocketEnum.PurchasedWidget)
 async onReceivePurchasedWidgets(
   @MessageBody() data: WidgetDto,
   @ConnectedSocket() client: Socket
 ): Promise<void> {
   this.eventsService.emitPurchasedWidget(client.data.user, data);
 }

 public emitPurchasedWidget(id: string, widget: WidgetDto) {
   const purchasedWidgetsRoom = this.generatePurchasedWidgetsRoom(id);

   this.server.to(purchasedWidgetsRoom).emit(`${SocketEnum.PurchasedWidget}_${id}`, widget);
 }

  public emitVisibleWidgets(id: string, widgets: WidgetDto[]) {
    const visibleWidgetsRoom = this.generateVisibleWidgetsRoom(id);

    this.server.to(visibleWidgetsRoom).emit(`${SocketEnum.ReceivedVisibleWidgets}_${id}`, widgets);
  }

  public emitPlaybackUrl(id: string, playbackUrl: string) {
    const playerRoom = this.generatePlayerRoom(id);

    this.server.to(playerRoom).emit(`${SocketEnum.ReceivedPlaybackUrl}_${id}`, playbackUrl);
  }

  public emitWidgets(id: string, widgets: WidgetDto[]) {
    const widgetsRoom = this.generateWidgetsRoom(id);

    this.server.to(widgetsRoom).emit(`${SocketEnum.ReceivedWidgets}_${id}`, widgets);
  }

  // Connection handling
  public async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const user = client.handshake.query?.id 
        ? <string>client.handshake.query.id 
        : <string>client.handshake.query.id;

      client.data.user = user;

      const ionicRoom = this.generateUserRoom(user);

      client.join(ionicRoom);

      SocketGateway.logger.log(`User ${user} is connected`);
    } catch (error) {
      SocketGateway.logger.error(error?.message, `User disconnected`);
      client.disconnect();
    }
  }

  afterInit() {
	  SocketGateway.logger.log(`User inited`);
  }
	
  handleDisconnect() {
	  SocketGateway.logger.warn(`User disconnected`);
  }

  // generate room methods
  private readonly generateUserRoom = (id: string) => `${this.userRoomPrefix}_${id}`;

  private readonly generatePlayerRoom = (id: string) => `${this.playerRoomPrefix}_${id}`;

  private readonly generateWidgetsRoom = (id: string) => `${this.widgetsRoomPrefix}_${id}`;

  private readonly generateVisibleWidgetsRoom = (id: string) => `${this.visibleWidgetsRoomPrefix}_${id}`;

  private readonly generatePurchasedWidgetsRoom = (id: string) => `${this.purchasedWidgetsRoomPrefix}_${id}`;
}