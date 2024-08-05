import React from 'react'
import Main from './Main/Main'
import Welcome from '../../Components/Welcome/Welcome'
import ProCont from '../../Components/Products/Products-Container/ProCont'
import Info from './Informations/Info'

export default function Home() {

    return <React.Fragment>

        <Main />

        <Welcome />

        <ProCont />

        <Info />

    </React.Fragment>

}
