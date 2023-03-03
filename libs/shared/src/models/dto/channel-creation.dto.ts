import { ChannelDto } from './channel.dto';

export type ChannelCreationDto = Omit<ChannelDto, 'id'>;