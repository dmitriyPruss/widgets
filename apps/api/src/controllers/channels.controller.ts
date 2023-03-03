import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  UseGuards,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { 
  ListWithTotals, 
  ChannelDto, 
  ChannelFilter, 
  StreamPlaybackDto
} from '@boilerplate/shared';
import { JwtAuthGuard } from '../services/guard/jwt.guard';
import { ChannelsService } from '../services/channels.service';


@Controller('channels')
@UseGuards(JwtAuthGuard)
export class ChannelsController {
  constructor(
    private readonly channelsService: ChannelsService
  ) {}

  @Get()
  public async findAll(
    @Query() filter: ChannelFilter
  ): Promise<ListWithTotals<ChannelDto>> {
    return await this.channelsService.findAll(filter);
  }

  @Get(':id')
	public async findOne(@Param('id') id: string): Promise<ChannelDto> {
		return await this.channelsService.getById(id);
	}

  @Get(':id/live_stream')
	public async getStreamPlayback(@Param('id') id: string): Promise<StreamPlaybackDto> {
		return await this.channelsService.getStreamPlayback(id);
	}

  @Post()
  public async createChannel(@Body() body: { name: string }): Promise<ChannelDto> {
	  return await this.channelsService.createChannel(body.name);
  }

  @Patch(':id')
	public async updateChannel(@Body() dto: ChannelDto): Promise<void> {
    await this.channelsService.updateChannel(dto);
	}

  @Delete(':id')
  public async deleteChannel(@Param('id') id: string): Promise<void> {
	  await this.channelsService.deleteChannel(id);
  }
}
