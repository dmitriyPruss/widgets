import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientIvsService } from './client-ivs.service';
import { 
  ListWithTotals, 
  ChannelDto, 
  ChannelFilter, 
  ChannelCreationDto,
  StreamPlaybackDto
} from '@boilerplate/shared';
import { Channel } from '@boilerplate/data';


@Injectable()
export class ChannelsService {
  constructor(
	  @InjectRepository(Channel) private readonly channelsRepository: Repository<Channel>,
    private readonly clientIvsService: ClientIvsService
  ) {}

  public async findAll(filter: ChannelFilter): Promise<ListWithTotals<ChannelDto>> {
    return await this.channelsRepository
	    .createQueryBuilder('channels')
	    .orderBy('channels.createdAt', 'DESC')
      .getManyWithTotals(filter);
  }

  public async getById(id: string): Promise<ChannelDto> {
    const foundChannel = await this.channelsRepository.findOneBy({ id });

    if (!foundChannel) {
			throw new NotFoundException('Channel not found');
		};

    return foundChannel;
  }

  public async getStreamPlayback(id: string): Promise<StreamPlaybackDto> {
    const foundChannel = await this.getById(id);

    return await this.clientIvsService.getStreamPlayback(foundChannel.ARN);
  }

  public async createChannel(name: string): Promise<Channel> {
    const newChannelData: ChannelCreationDto = 
      await this.clientIvsService.createChannel(name);

	  const newChannel: Channel = this.channelsRepository.create(newChannelData);

	  return await this.channelsRepository.save(newChannel);
  }

  public async updateChannel(body: ChannelDto): Promise<void> {
    const { id,	name } = body;

    const foundChannel = await this.getById(id);

    await this.clientIvsService.updateChannel(name, foundChannel.ARN);

    await this.channelsRepository.update(id, { name });
  }

  public async deleteChannel(id: string): Promise<void> {
    const foundChannel = await this.getById(id);

    await this.clientIvsService.deleteChannel(foundChannel.ARN);

    await this.channelsRepository.delete(id);
  }
}
