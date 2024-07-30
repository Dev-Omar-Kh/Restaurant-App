import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Site/Components/Layout/Layout';
import Home from './Site/Components/Home/Home';

import './App.css';

const routes = createBrowserRouter([

  {path : '/' , element : <Layout /> , children : [

    {path : '/' , element : <Home />}

  ]}

])

export default function App() {

  return <React.Fragment>

    <RouterProvider router={routes} />

  </React.Fragment>

};
