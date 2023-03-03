import { 
  MaxLength, 
  MinLength, 
  Matches 
} from 'class-validator';
import regExps from '../constants/channel-dto.constants';


export class ChannelDto {
  @Matches(regExps.name, {
		message: 'Wrong symbols!',
	})
	@MinLength(2, { 
    message: 'Name is too short or empty' 
  })
	@MaxLength(20, {
		message: 'Name is too long',
	})
  name: string;
  
  id?: string;
  key?: string;
  ingestEndpoint?: string;
  playbackURL?: string;
  ARN?: string;
  createdAt?: Date;
  updatedAt?: Date;
}