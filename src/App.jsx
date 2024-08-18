import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Site/Layout/Layout';
import LayoutAdmin from './Admin/Layout/LayoutAdmin';
import Home from './Site/Pages/Home/Home';
import Auth from './Site/Pages/Auth/Auth';
import Users from './Admin/Pages/Users/Users';
import AdminRoute from './Admin/Protected/AdminRoute';

import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { Store } from './Site/Store/Store';
import Info from './Admin/Pages/Info/Info';
import Main from './Admin/Pages/Main/Main';

const routes = createBrowserRouter([

  {path : '/' , element : <Layout /> , children : [

    {path : '/' , element : <Home />},
    {path : '/auth' , element : <Auth />},

  ]},

  {path : 'dashboard' , element : <AdminRoute><LayoutAdmin /></AdminRoute> , children : [

    {path : '/dashboard/user' , element : <Users />},
    {path : '/dashboard/info' , element : <Info />},
    {path : '/dashboard/main' , element : <Main />},

  ]}

])

export default function App() {

  let clientQuery = new QueryClient();

  return <React.Fragment>

    <Provider store={Store}>

      <QueryClientProvider client={clientQuery}>

        <RouterProvider router={routes} />

      </QueryClientProvider>

    </Provider>

  </React.Fragment>

};
