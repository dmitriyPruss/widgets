import React, { FC, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import NotFoundPage from './pages/not-found/not-found.page';
import AuthorizedPage from './pages/authorized-page/authorized.page';
import RequireAuth from './components/require-auth/require-auth.component';
import RequireUnauthorized from './components/require-unauthorized/require-unauthorized.component';
import RouterSuspense from './components/router-suspense/router-suspense.component';

const AuthorizedArea = React.lazy(async () => import('./areas/authorized-area.component'));
const UnauthorizedArea = React.lazy(async () => import('./areas/unauthorized-area.component'));
const LoginPage = React.lazy(async () => import('./pages/login/login.page'));
const SignUpPage = React.lazy(async () => import('./pages/signup/signup.page'));
const ChannelPage = React.lazy(async () => import('./pages/channel/channel.page'));


const Root: FC = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <RequireAuth><AuthorizedArea /></RequireAuth>,
      children: [
        // temporary link for admin route
        { index: true, element: <Navigate to='admin' /> },
        { 
          path: 'admin', 
          children: [
            { index: true, element: <AuthorizedPage /> },
            { path: 'stream/:id', element: <ChannelPage /> }
          ] 
        }
      ]
    },
    {
      element: <RequireUnauthorized><UnauthorizedArea /></RequireUnauthorized>,
      children: [
        { path: '/login', element: <LoginPage /> },
        { path: '/signup', element: <SignUpPage /> },
      ]
    },
    { path: '*', element: <NotFoundPage /> }
  ]);

  return (
    <Suspense fallback={<RouterSuspense />}>
      {routes}
    </Suspense>
  );
}

export default Root;
