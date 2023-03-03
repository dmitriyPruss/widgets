import { Socket, io } from 'socket.io-client';
import { SocketEnum, WidgetDto } from '@boilerplate/shared';


export default class SocketClient {
  private socket: Socket | null;
  private readonly baseUrl: string;

  constructor() {
	this.baseUrl = 'http://localhost:3000/api';
  }

  public connect(token: string) {
	if (!token || !this.baseUrl) {
	  return;
	}

	if (this.socket) {
	  this.disconnect();
	}

	this.socket = io(this.baseUrl, {
	  query: { 
		token
	  },
	  transports: ['websocket', 'polling'],
	  reconnection: true,
	  reconnectionDelay: 7000
	});

	this.socket.connect();

	console.log('User is connected');
  }

  public disconnect() {
	if (this.socket?.active) {
	  this.socket.disconnect();
	}

	this.socket = null;
		
	console.log('User is disconnected');
  }


  // Widgets
  public joinWidgets(id: string) {
	this.socket?.emit(SocketEnum.JoinWidgets, { id });

	console.log('Frontend Join widgets');
  }

  public leftWidgets(id: string) {
	this.socket?.emit(SocketEnum.LeftWidgets, { id });

	console.log('Frontend Left widgets');
  }

  public emitWidgets(id: string, widgets: WidgetDto[]): void {
	this.socket?.emit(SocketEnum.ReceivedWidgets, widgets);

	console.log('Subscribe widgets');
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
	
  public emitWidgetIds(id: string, ids: string[]): void {
	this.socket?.emit(SocketEnum.ReceivedVisibleWidgets, ids);
  }

  // Buying widgets
  public joinBuyingWidgets(id: string) {
	this.socket?.emit(SocketEnum.JoinPurchasedWidgets, { id });
	
	console.log('Join purchased widgets');
  }
	
  public leftBuyingWidgets(id: string) {
	this.socket?.emit(SocketEnum.LeftPurchasedWidgets, { id });
	
	console.log('Left purchased widgets');
  }

  public subscribeOnPurchasediWidget(
	id: string, handler: (data: WidgetDto) => void
  ): void {
	this.socket?.on(`${SocketEnum.PurchasedWidget}_${id}`, handler);
	
	console.log('Subscribe purchased widgets');
  }
	
  public unsubscribeOnPurchasedWidget(id: string): void {
	this.socket?.off(`${SocketEnum.PurchasedWidget}_${id}`);
	
	console.log('Unsubscribe purchased widgets');
  }
}
