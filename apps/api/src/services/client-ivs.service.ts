import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ChannelLatencyMode,
  ChannelType,
  CreateChannelCommand,
  CreateChannelCommandInput,
  CreateChannelCommandOutput,
  DeleteChannelCommand,
  DeleteChannelCommandInput,
  GetStreamCommand,
  GetStreamCommandInput,
  GetStreamCommandOutput,
  IvsClient,
  UpdateChannelCommand,
  UpdateChannelCommandInput
} from '@aws-sdk/client-ivs';
import { ChannelCreationDto, StreamPlaybackDto } from '@boilerplate/shared';
import { IError, IErrorMessage } from '../interfaces/ivs-service-errors';
import { EventsService } from './events.service';


@Injectable()
export class ClientIvsService {
  private static readonly logger = new Logger('ClientIvsService');
  private readonly ivsClient: IvsClient;

  constructor(
	private readonly configService: ConfigService,
	private readonly eventsService: EventsService
  ) {
	this.ivsClient = new IvsClient({
	  region: this.configService.get('NX_AMAZON_IVS_REGION'),
	  credentials: {
		accessKeyId: this.configService.get('NX_AMAZON_IVS_ACCESS_KEY_ID'),
		secretAccessKey: this.configService.get('NX_AMAZON_IVS_SECRET_ACCESS_KEY')
	  }
	});
  }
		
  public async getStreamPlayback(channelArn: string): Promise<StreamPlaybackDto> {
	const streamCommandInput: GetStreamCommandInput = { channelArn };
	
	const streamCommand: GetStreamCommand = new GetStreamCommand(streamCommandInput);	
	
	try {	
	  const streamData: GetStreamCommandOutput = await this.ivsClient.send(streamCommand);

	  this.eventsService.emitStream(streamData?.stream?.playbackUrl);

	  return <StreamPlaybackDto>streamData?.stream;
	} catch (error) {
	  this.eventsService.emitStream(null);

	  this.handleError(error);
	}
  }
		
  public async createChannel(name: string): Promise<ChannelCreationDto> {
	const channelCommandInput: CreateChannelCommandInput = {
	  name,
	  authorized: false,
	  latencyMode: ChannelLatencyMode.LowLatency,
	  type: ChannelType.StandardChannelType
	}
	  
	const channelCommand: CreateChannelCommand = new CreateChannelCommand(channelCommandInput);
	
	try {
	  const channelData: CreateChannelCommandOutput = await this.ivsClient.send(channelCommand);
		  
	  const { channel, streamKey } = channelData;
		
	  const streamData: ChannelCreationDto = {
		name: channel.name,
		key: streamKey.value,
		ingestEndpoint: this.getIngestEndpoint(channel.ingestEndpoint),
		playbackURL: channel.playbackUrl,
		ARN: channel.arn
	  };
		
	  return streamData;	
	} catch (error) {
	  this.handleError(error);
	}
  }
	
  public async updateChannel(name: string, arn: string): Promise<void> {
	const channelCommandInput: UpdateChannelCommandInput = { name, arn };
	
	const channelCommand: UpdateChannelCommand = new UpdateChannelCommand(channelCommandInput);
  
	try {
	  await this.ivsClient.send(channelCommand);	
	} catch (error) {
	  this.handleError(error);
	}
  }

  public async deleteChannel(arn: string): Promise<void> {
	const channelCommandInput: DeleteChannelCommandInput = { arn };
	
	const channelCommand: DeleteChannelCommand = new DeleteChannelCommand(channelCommandInput);
  
	try {
	  await this.ivsClient.send(channelCommand);
	} catch (error) {
	  this.handleError(error);
	}
  }

  private getIngestEndpoint(endpoint: string): string {
	return `rtmps://${endpoint}:443/app/`;
  }

  private handleError<T extends IErrorMessage>(error: IError<T>) {
	const errorMessage = typeof error === 'string' 
	  ? error 
	  : error?.message;
		
	ClientIvsService.logger.error(errorMessage, 'ClientIvsService');
	
	throw error;
  }
}