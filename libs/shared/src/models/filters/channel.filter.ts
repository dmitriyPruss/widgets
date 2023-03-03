import { OrderFilter } from '../../interfaces/filters/order.filter';
import { PaginationFilter } from '../../interfaces/filters/pagination.filter';
import { OrderParamPair } from '../../interfaces/filters/order-param-pair';
import { ChannelDto } from '../dto/channel.dto';

export interface ChannelFilter extends OrderFilter<ChannelDto>, PaginationFilter {
  orderedBy?: OrderParamPair<ChannelDto>[] | null;

  page?: number;
  pageSize?: number;
}
