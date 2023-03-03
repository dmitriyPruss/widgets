import { 
  IsEmail, 
  MaxLength, 
  MinLength, 
  Matches, 
  IsNotEmpty 
} from 'class-validator';
import regExps from '../constants/user-dto.constants';


export interface UserDto {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(regExps.password, {
	  message: 'Password must include upper & lower case letters, a number, a special character'
  })
  @MinLength(6, { 
    message: 'Password is too short' 
  })
  @MaxLength(20, {
	  message: 'Password is too long'
  })
  password: string;
}

export class SignUpDto {
  @Matches(regExps.name, {
	  message: 'Only Latin! First character - a capital letter'
  })
  @MinLength(2, { 
    message: 'Name is too short' 
  })
  @MaxLength(20, {
	  message: 'Name is too long'
  })
  name: string;

  @Matches(regExps.lastName, {
	  message: 'Only Latin! First character - a capital letter'
  })
  @MinLength(2, { 
    message: 'Lastname is too short' 
  })
  @MaxLength(25, {
	  message: 'Lastname is too long'
  })
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Matches(regExps.password, {
	  message: 'Password must include upper & lower case letters, a number, a special character'
  })
  @MinLength(6, { 
    message: 'Password is too short' 
  })
  @MaxLength(20, {
	  message: 'Password is too long'
  })
  password: string;
}

export interface ValidateUserDto {
  user?: UserDto;
  error?: boolean;
  message?: string;
}