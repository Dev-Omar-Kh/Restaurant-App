import React from 'react';

import sCSS from './services.module.css';

export default function Services() {

    return <React.Fragment>

        <div className={sCSS.container}>

            <h3>Our Achievements</h3>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Suspendisse varius enim in eros elementum tristique. Duis cursus, 
                mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
            </p>

            <div className={sCSS.numbers}>

                <div className={sCSS.numbs_cont}>

                    <p>+200</p>
                    <span>Customer Served</span>

                </div>

                <div className={sCSS.numbs_cont}>

                    <p>+50K</p>
                    <span>Branches</span>

                </div>

                <div className={sCSS.numbs_cont}>

                    <p>+370k</p>
                    <span>Deliveries</span>

                </div>

                <div className={sCSS.numbs_cont}>

                    <p>+100</p>
                    <span>Recognition</span>

                </div>

            </div>

        </div>

    </React.Fragment>

}
