import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'

export default function ProtectedRoute({children}) {

    const [userRole, setUserRole] = useState(null)

    useEffect(() => {

        if(localStorage.getItem('tkn')){

            const {role} = jwtDecode(localStorage.getItem('tkn'));

            setUserRole(role);

        }

    } , [])

    if(userRole !== 'admin'){

        return <React.Fragment>

            <h1>Error 404</h1>

        </React.Fragment>

    }

    return <React.Fragment>

        {children}

    </React.Fragment>

}
