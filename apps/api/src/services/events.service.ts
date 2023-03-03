import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { 
  IonicRequisitesEnum, 
  WidgetDto, 
  WidgetsSocketEventsEnum 
} from '@boilerplate/shared';


@Injectable()
export class EventsService {
  constructor(private readonly eventEmitter: EventEmitter2) {};
  
  public emitStream(playbackUrl: string): void {
	  this.eventEmitter.emit(
      WidgetsSocketEventsEnum.StreamReceived, 
      IonicRequisitesEnum.Id, 
      playbackUrl
    );
  }
		
  public emitWidgets(widgets: WidgetDto[]): void {
	  this.eventEmitter.emit(
      WidgetsSocketEventsEnum.WidgetsReceived, 
      IonicRequisitesEnum.Id, 
      widgets
    );
  }

  public emitVisibleWidgets(widgets: WidgetDto[]): void {
    this.eventEmitter.emit(
      WidgetsSocketEventsEnum.WidgetsShown, 
      IonicRequisitesEnum.Id, 
      widgets
    );
  }

  public emitPurchasedWidget(id: string, widget: WidgetDto): void {
    this.eventEmitter.emit(
      WidgetsSocketEventsEnum.WidgetPurchased, 
      id, 
      widget
    );
  }
}