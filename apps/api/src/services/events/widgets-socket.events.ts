import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SocketGateway } from '../../socket/socket.gateway';
import { WidgetDto, WidgetsSocketEventsEnum } from '@boilerplate/shared';


@Injectable()
export class WidgetsSocketEventsService {
  constructor(private readonly socketGateway: SocketGateway) {}

  @OnEvent(WidgetsSocketEventsEnum.WidgetsReceived)
  public async onNewWidgetsReceived(id: string, widgets: WidgetDto[]): Promise<void> {
	  this.socketGateway.emitWidgets(id, widgets);
  }

  @OnEvent(WidgetsSocketEventsEnum.StreamReceived)
  public async onNewStreamReceived(id: string, playbackUrl: string | null): Promise<void> {
	  this.socketGateway.emitPlaybackUrl(id, playbackUrl);
  }

  @OnEvent(WidgetsSocketEventsEnum.WidgetsShown)
  public async onVisibleWidgetReceived(id: string, widgets: WidgetDto[]): Promise<void> {
	  this.socketGateway.emitVisibleWidgets(id, widgets);
  }

  @OnEvent(WidgetsSocketEventsEnum.WidgetPurchased)
  public async onWidgetPurchased(id: string, widget: WidgetDto): Promise<void> {
	  this.socketGateway.emitPurchasedWidget(id, widget);
  }
}