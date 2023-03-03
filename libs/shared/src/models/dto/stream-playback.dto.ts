import { IsNotEmpty } from 'class-validator';
  
export class StreamPlaybackDto {
  @IsNotEmpty()
  playbackUrl: string;
  
  channelArn?: string;
  health?: string;
  startTime?: Date;
  state?: string;
  streamId?: string;
  viewerCount?: number
}