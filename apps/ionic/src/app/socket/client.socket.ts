import { Socket, io } from 'socket.io-client';
import { IonicRequisitesEnum, SocketEnum, WidgetDto } from '@boilerplate/shared';
import { baseUrl } from '../constants/socket.constants';


export default class SocketClient {
  private socket: Socket | null;
  private readonly baseUrl: string;

  constructor() {
	this.baseUrl = baseUrl;
  }

  public connect() {
	if (!this.baseUrl) {
	  return;
	}

	if (this.socket) {
	  this.disconnect();
	}

	this.socket = io(this.baseUrl, {
	  query: { 
		id: IonicRequisitesEnum.Id
	  },
	  transports: ['websocket', 'polling'],
	  reconnection: true,
	  reconnectionDelay: 7000
	});

	this.socket.connect();

	console.log('Socket is connected');
  }

  public disconnect() {
	if (this.socket?.active) {
	  this.socket.disconnect();
	}

	this.socket = null;
		
	console.log('Socket is disconnected');
  }

  // Player
  public joinPlayer(id: string) {
	this.socket?.emit(SocketEnum.JoinPlayer, { id });
	
	console.log('Join player');
  }

  public leftPlayer(id: string) {
	this.socket?.emit(SocketEnum.LeftPlayer, { id });
	
	console.log('Left player');
  }

  public subscribeOnNewPlaybackUrl(
	id: string, 
	handler: (data: string) => void
  ): void {
	this.socket?.on(`${SocketEnum.ReceivedPlaybackUrl}_${id}`, handler);

	console.log('Subscribe on stream');
  }

  public unsubscribeOnNewPlaybackUrl(id: string): void {
	this.socket?.off(`${SocketEnum.ReceivedPlaybackUrl}_${id}`);

	console.log('Unsubscribe from stream');
  }


  // Widgets
  public joinWidgets(id: string) {
	this.socket?.emit(SocketEnum.JoinWidgets, { id });

	console.log('Join widgets');
  }

  public leftWidgets(id: string) {
	this.socket?.emit(SocketEnum.LeftWidgets, { id });

	console.log('Left widgets');
  }

  public subscribeOnNewWidgets(
	id: string, 
	handler: (data: WidgetDto[]) => void
  ): void {
	this.socket?.on(`${SocketEnum.ReceivedWidgets}_${id}`, handler);

	console.log('Subscribe widgets');
  }

  public unsubscribeOnNewWidgets(id: string): void {
	this.socket?.off(`${SocketEnum.ReceivedWidgets}_${id}`);

	console.log('Unsubscribe widgets');
  }


  // Visible Widgets
  public joinVisibleWidgets(id: string) {
	this.socket?.emit(SocketEnum.JoinVisibleWidgets, { id });
	
	console.log('Join visible widgets');
  }
	
  public leftVisibleWidgets(id: string) {
	this.socket?.emit(SocketEnum.LeftVisibleWidgets, { id });
	
	console.log('Left visible widgets');
  }
	
  public subscribeOnNewVisibleWidgets(
	id: string, 
	handler: (data: WidgetDto[]) => void
  ): void {
	this.socket?.on(`${SocketEnum.ReceivedVisibleWidgets}_${id}`, handler);
	
	console.log('Subscribe visible widgets');
  }
	
  public unsubscribeOnNewVisibleWidgets(id: string): void {
	this.socket?.off(`${SocketEnum.ReceivedVisibleWidgets}_${id}`);
	
	console.log('Unsubscribe visible widgets');
  }

  
  // Buy Widgets
  public joinBuyingWidgets(id: string) {
	this.socket?.emit(SocketEnum.JoinPurchasedWidgets, { id });
	
	console.log('Join buy widgets');
  }
	
  public leftBuyingWidgets(id: string) {
	this.socket?.emit(SocketEnum.LeftPurchasedWidgets, { id });
	
	console.log('Left buy widgets');
  }
	
  public emitPurchasedWidget(id: string, widget: WidgetDto): void {
	this.socket?.emit(SocketEnum.PurchasedWidget, widget);
  }
}
