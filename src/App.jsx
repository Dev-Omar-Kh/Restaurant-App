import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Site/Layout/Layout';
import LayoutAdmin from './Admin/Layout/LayoutAdmin';
import Home from './Site/Pages/Home/Home';
import Auth from './Site/Pages/Auth/Auth';
import Users from './Admin/Pages/Users/Users';
import AdminRoute from './Site/Components/Admin-Protect/AdminRoute';

import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const routes = createBrowserRouter([

  {path : '/' , element : <Layout /> , children : [

    {path : '/' , element : <Home />},
    {path : '/auth' , element : <Auth />},

  ]},

  {path : 'dashboard' , element : <AdminRoute><LayoutAdmin /></AdminRoute> , children : [

    {path : '/dashboard' , element : <Users />}

  ]}

])

export default function App() {

  let clientQuery = new QueryClient();

  return <React.Fragment>

    <QueryClientProvider client={clientQuery}>

      <RouterProvider router={routes} />

    </QueryClientProvider>

  </React.Fragment>

};
