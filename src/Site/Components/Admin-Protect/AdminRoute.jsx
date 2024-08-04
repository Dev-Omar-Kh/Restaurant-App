import { jwtDecode } from 'jwt-decode'
import React from 'react'

export default function ProtectedRoute({children}) {

    if(localStorage.getItem('tkn')){

        const data = jwtDecode(localStorage.getItem('tkn'));
        console.log(data);

    }

    return <React.Fragment>

        {children}

    </React.Fragment>

}
