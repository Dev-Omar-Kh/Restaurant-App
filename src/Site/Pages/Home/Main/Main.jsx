import React from 'react';

import mCSS from './main.module.css';

export default function Main() {

    return <React.Fragment>

        <div className={mCSS.container}>

            <div className={mCSS.main_det}>

                <h3>Experience the real taste of <span>Best Dishes</span></h3>

                <p>Experience the real taste of <span>Dishes</span></p>

                <div className={mCSS.det_btns}>

                    <a href="#fff">View Dishes</a>
                    <a href="#fff">View Menu</a>

                </div>

            </div>

        </div>

    </React.Fragment>

}
