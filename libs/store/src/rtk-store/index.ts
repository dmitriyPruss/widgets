import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.slice';
import widgetsStoreReducer from './reducers/widgets-store.slice';
import { mainApi } from './services/main-api.api';

export const store = configureStore({
  reducer: {
    authReducer,
    widgetsStoreReducer,
    [mainApi.reducerPath]: mainApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat([
      mainApi.middleware
    ])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
