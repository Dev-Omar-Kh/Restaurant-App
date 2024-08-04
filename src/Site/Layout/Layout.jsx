import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Footer from './../Components/Footer/Footer';

export default function Layout() {

    return <React.Fragment>

        <Header />

        <Outlet />

        <Footer />

    </React.Fragment>

}
