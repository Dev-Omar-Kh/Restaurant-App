import React from 'react';

import pcCSS from './pro-cont.module.css';
import ProCard from '../Product-Card/ProCard';

export default function ProCont() {

    return <React.Fragment>

        <div className={pcCSS.container}>

            <div className={pcCSS.title}>

                <p>Our Special Dishes</p>

                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>

            </div>

            <ul className={pcCSS.filter}>

                <div className={pcCSS.filter_scroll}>

                    <li>All</li>
                    <li>Rice</li>
                    <li>Sandwiches</li>
                    <li>Pizzas</li>
                    <li>Soap</li>
                    <li>Drinks</li>

                </div>

            </ul>

            <div className={pcCSS.card_cont}>

                <ProCard />
                <ProCard />
                <ProCard />
                <ProCard />
                <ProCard />
                <ProCard />
                <ProCard />
                <ProCard />
                <ProCard />
                <ProCard />
                <ProCard />
                <ProCard />
                <ProCard />
                <ProCard />

            </div>

        </div>

    </React.Fragment>

}
