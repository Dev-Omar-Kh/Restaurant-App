import React from 'react'
import Main from './Main/Main'
import Welcome from '../../Components/Welcome/Welcome'
import ProCont from '../../Components/Products/Products-Container/ProCont'
import Info from './Information/Information'
import Services from '../../Components/Achievements/Our-Services/Services'

export default function Home() {

    return <React.Fragment>

        <Main />

        <Welcome />

        <ProCont />

        <Info />

        <Services />

    </React.Fragment>

}