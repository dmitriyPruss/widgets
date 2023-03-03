import { AxiosInstance, AxiosResponse } from 'axios';
import { UserDto, UserFilter } from '@boilerplate/shared';

class UsersService {
  private readonly baseRoute = 'users';

  constructor(private readonly httpClient: AxiosInstance) {}

  public async getTestData(filters?: UserFilter): Promise<AxiosResponse<UserDto[]>> {
    return this.httpClient.get<UserDto[]>(this.baseRoute, { params: filters });
  }
}

export default UsersService;
