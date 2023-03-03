import { AuthState } from '../reducers/auth.slice';

class LocalStorageService {
  public clearToken = (state: AuthState): void => {
    localStorage.removeItem('token');
    state.token = null;
    state.isAuthenticated = !!state.token;
  }

  public setToken = (state: AuthState, token: string | null): void => {
    if (token) {
      localStorage.setItem('token', token);
      state.token = token;
      state.isAuthenticated = !!state.token;
    } else {
      this.clearToken(state);
    }
  }
}

export default LocalStorageService;