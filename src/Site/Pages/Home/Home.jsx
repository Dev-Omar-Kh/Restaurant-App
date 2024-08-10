import React from 'react'
import Main from '../../Components/Main/Main'
import Welcome from '../../Components/Welcome/Welcome'
import ProCont from '../../Components/Products/Products-Container/ProCont'
import Info from '../../Components/Information/Information'
import Services from '../../Components/Achievements/Our-Services/Services'
import ReviewsCont from '../../Components/Achievements/Reviews/Reviews-cont/ReviewsCont'

export default function Home() {

    return <React.Fragment>

        <Main />

        <Welcome />

        <ProCont />

        <Info />

        <Services />

        <ReviewsCont />

    </React.Fragment>

}