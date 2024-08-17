import React, { useEffect, useState } from 'react';

import dblCSS from './dbl.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRole } from '../../Store/AdminRouteSlice';

export default function DashBoardLink() {

    const [token, setToken] = useState(localStorage.getItem('tkn'));

    const {userRole} = useSelector(store => store.adminRoute);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getUserRole());

    } , [dispatch , token]);

    useEffect(() => {

        const handleStorageChange = () => {

            setToken(localStorage.getItem('tkn'));

        };

        window.addEventListener('tokenChanged', handleStorageChange);

        return () => {

            window.removeEventListener('tokenChanged', handleStorageChange);

        };

    }, []);

    return <React.Fragment>

        {userRole === 'user' ? '' : <Link to={'/dashboard/user'} className={dblCSS.container}>

            <img src={require('../../Images/dashboard-icon-light.webp')} alt="" />

        </Link>}

    </React.Fragment>

}
