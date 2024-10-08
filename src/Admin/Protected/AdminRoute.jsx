import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserRole } from '../../Site/Store/AdminRouteSlice';

export default function ProtectedRoute({children}) {

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

    if(userRole !== 'admin'){

        return <React.Fragment>

            <h1>Error 404</h1>

        </React.Fragment>

    }

    return <React.Fragment>

        {children}

    </React.Fragment>

}
