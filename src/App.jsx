import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Site/Components/Layout/Layout';
import Home from './Site/Pages/Home/Home';

import './App.css';
import Auth from './Site/Pages/Auth/Auth';

const routes = createBrowserRouter([

  {path : '/' , element : <Layout /> , children : [

    {path : '/' , element : <Home />},
    {path : '/auth' , element : <Auth />},

  ]}

])

export default function App() {

  return <React.Fragment>

    <RouterProvider router={routes} />

  </React.Fragment>

};
