import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Site/Components/Layout/Layout';

const routes = createBrowserRouter([

  {path : '/' , element : <Layout /> , children : []}

])

export default function App() {

  return <React.Fragment>

    <RouterProvider router={routes} />

  </React.Fragment>

};
