import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocalStorageService from '../services/local-storage.service';

const localStorageService = new LocalStorageService();

export interface AuthState {
  token: string | null,
  isAuthenticated: boolean
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false 
}

export const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    logout: (state: AuthState) => { 
      localStorageService.clearToken(state);
    },
    setToken: (state: AuthState, action: PayloadAction<string | null>): void => {
      localStorageService.setToken(state, action.payload);
    }
  }
});

export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;