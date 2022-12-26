import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import pageURL from '_constants/pageURL';

import AppLayout from '_src/Layout/AppLayout';
import Tokens from './pages/Tokens';
import Error from './pages/Error';
import AutoInvest from './pages/AutoInvest';
import Position from './pages/Position';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<AppLayout />} errorElement={<Error />}>
        <Route path={pageURL.tokens} element={<Tokens />}></Route>
        <Route path={pageURL.autoInvest} element={<AutoInvest />}></Route>
        <Route path={pageURL.position} element={<Position />}></Route>
      </Route>
      <Route path="*" element={<div>404</div>}></Route>
    </Route>,
  ),
);

const RoutesContainer = () => {
  return <RouterProvider router={router} />;
};

export default RoutesContainer;
