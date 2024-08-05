import React, { useState } from 'react';

import pcCSS from './pro-cont.module.css';
import ProCard from '../Product-Card/ProCard';

export default function ProCont() {

    const [filterActive, setFilterActive] = useState(0);

    const filters =['All', 'Rice', 'Sandwiches', 'Pizzas', 'Soap', 'Drinks'];

    const selectType = (type) =>{

        setFilterActive(type);

    }

    const filterStyle = (index) => ({

        backgroundColor : index === filterActive ? 'var(--dark-color-1-005)' : 'transparent'

    });

    return <React.Fragment>

        <div className={pcCSS.container}>

            <div className={pcCSS.title}>

                <p>Our Special Dishes</p>

                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>

            </div>

            <ul className={pcCSS.filter}>

                <div className={pcCSS.filter_scroll}>

                    {filters.map((type , idx) => <li key={idx} onClick={() => selectType(idx)} style={filterStyle(idx)}>{type}</li>)}

                </div>

            </ul>

            <div className={pcCSS.card_cont}>

                <ProCard />

            </div>

        </div>

    </React.Fragment>

}
