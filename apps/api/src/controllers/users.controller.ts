import { 
  Body, 
  Controller, 
  Get, 
  Query, 
  UseGuards, 
  Res, 
  Req, 
  Post 
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserCreationDto, UserDto, UserFilter } from '@boilerplate/shared';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Get()
  public async findAll(@Query() filter: UserFilter): Promise<UserDto[]> {
  	return await this.usersService.findAll(filter);
  }

  // @Put()
  // public async create(@Body() entity: UserDto): Promise<UserDto> {
  //   return this.usersService.upsert(entity);
  // }

	@UseGuards(AuthGuard('local'))
	@Post('/login')
	public async login(@Res({ passthrough: true }) res: Response, @Req() req: Request): Promise<string> {
  	const user = req.user as UserDto;

		const accessToken = this.authService.generateJWT(user);

    return JSON.stringify(accessToken);
	}

  @Post('/signup')
	public async registration(@Body() newUserDto: UserCreationDto) {    
    const newUser = <UserCreationDto>await this.authService.registrateUser(newUserDto);

		const accessToken = this.authService.generateJWT(newUser as UserDto);

		return JSON.stringify(accessToken);
	}
}
