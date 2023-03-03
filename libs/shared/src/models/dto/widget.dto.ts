import {
  IsUrl,  
  Matches, 
  MinLength, 
  MaxLength, 
  NotEquals
} from 'class-validator';
import regExps from '../constants/widget-dto.constants';


export class WidgetDto {
  @Matches(regExps.title, {
		message: 'Wrong symbols!',
	})
	@MinLength(2, { 
    message: 'Name is too short or empty' 
  })
	@MaxLength(20, {
		message: 'Name is too long',
	})
  title: string;
  
  @IsUrl()
  url: string;

  @Matches(regExps.price, {
		message: 'Enter correct number for price',
	})
  @NotEquals('0', {
    message: 'Price must be greater than zero'
  })
  price: number;

  @Matches(regExps.coord, {
		message: 'Must be greater than zero. Maximum - 3 digits',
	})
  startX: number;

  @Matches(regExps.coord, {
		message: 'Must be greater than zero. Maximum - 3 digits',
	})
  startY: number;

  id?: string;
  channelId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class WidgetInStoreDto extends WidgetDto {
  quantity: number;
}

export class WidgetIdsDto {
  channelId?: string;
  ids: string[]
}