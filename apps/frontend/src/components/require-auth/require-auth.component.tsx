import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '@boilerplate/store';
import { socketClient } from '../../socket';


const RequireAuth = ({ children }: { children: JSX.Element }): ReactElement => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authReducer.isAuthenticated
  );

  const token = useSelector(
    (state: RootState) => state.authReducer.token as string
  );

  useEffect(() => {
		socketClient.connect(token);

		return () => {
			socketClient.disconnect();
		};
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
