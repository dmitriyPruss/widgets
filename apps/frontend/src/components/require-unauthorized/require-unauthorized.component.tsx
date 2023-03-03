import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { observer } from 'mobx-react-lite';
import type { RootState } from '@boilerplate/store';


const RequireUnauthorized = ({ children }: { children: JSX.Element }): ReactElement => {  
  const isAuthenticated = useSelector(
    (state: RootState) => state.authReducer.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireUnauthorized;
