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
  WidgetDto, 
  WidgetFilter 
} from '@boilerplate/shared';
import { JwtAuthGuard } from '../services/guard/jwt.guard';
import { WidgetsService } from '../services/widgets.service';


@Controller('widgets')
@UseGuards(JwtAuthGuard)
export class WidgetsController {
  constructor(
	  private readonly widgetsService: WidgetsService
  ) {}

  @Get(':id')
  public async findAll(
    @Param('id') widgetId: string, 
    @Query() filter: WidgetFilter
  ): Promise<ListWithTotals<WidgetDto>> {
	  return await this.widgetsService.findAll(widgetId, filter);
  }

  @Post()
  public async createWidget(@Body() body: WidgetDto): Promise<WidgetDto> {
	  return await this.widgetsService.createWidget(body);
  }

  @Patch(':id')
	public async updateWidget(@Body() dto: WidgetDto): Promise<void> {
    await this.widgetsService.updateWidget(dto);
	}

  @Delete(':id')
  public async deleteWidget(
    @Body() body: { channelId: string, widgetId: string }
  ): Promise<void> {
	  const { channelId, widgetId } = body;

	  await this.widgetsService.deleteWidget({ channelId, widgetId });
  }
}
