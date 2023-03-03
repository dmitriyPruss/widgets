import { OrderParamPair } from '../../interfaces/filters/order-param-pair';
import { OrderFilter } from '../../interfaces/filters/order.filter';
import { PaginationFilter } from '../../interfaces/filters/pagination.filter';
import { WidgetDto } from '../dto/widget.dto';

export interface WidgetFilter extends OrderFilter<WidgetDto>, PaginationFilter {
  orderedBy?: OrderParamPair<WidgetDto>[] | null;

  page?: number;
  pageSize?: number;
}
