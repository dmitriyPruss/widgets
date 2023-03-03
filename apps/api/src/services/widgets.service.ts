import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from './events.service';
import { Widget } from '@boilerplate/data';
import { 
  ListWithTotals, 
  WidgetDto, 
  WidgetFilter
} from '@boilerplate/shared';


@Injectable()
export class WidgetsService {
  constructor(
	@InjectRepository(Widget) private readonly widgetsRepository: Repository<Widget>,
	private readonly eventsService: EventsService
  ) {}

  public async findAll(
	channelId: string, 
	filter: WidgetFilter
  ): Promise<ListWithTotals<WidgetDto>> {
	return await this.widgetsRepository
	  .createQueryBuilder('widgets')
	  .where({ channelId })
	  .orderBy('widgets.createdAt', 'DESC')
	  .getManyWithTotals(filter);
  }

  public async getById(id: string): Promise<WidgetDto> {
    const foundWidget = await this.widgetsRepository.findOneBy({ id });

    if (!foundWidget) {
	  throw new NotFoundException('Channel not found');
	};

    return foundWidget;
  }

  public async createWidget(body: WidgetDto): Promise<Widget> {
	const newWidget = this.widgetsRepository.create(body);
	  
	return await this.widgetsRepository.save(newWidget);
  }

  public async showVisibleWidgets(body: string[]): Promise<WidgetDto[]> {
	const widgets: WidgetDto[] = [];

	for (const id of body) {
	  const widget = await this.getById(id);

	  widgets.push(widget);
	}

	return widgets;
  }

  public async updateWidget(body: WidgetDto): Promise<void> {
	const {
	  id,	 
	  ...bodyWithoutId
	} = body;

	await this.widgetsRepository.update(id, bodyWithoutId);
  }

  public async deleteWidget({ channelId, widgetId }): Promise<void> {
	const foundWidget = await this.widgetsRepository.findOne({
	  where: { 
		id: widgetId, 
		channelId 
	  }
	});

	if (!foundWidget) {
	  throw new NotFoundException('Widget not found');
	};

	await this.widgetsRepository.delete(widgetId);
  }
}