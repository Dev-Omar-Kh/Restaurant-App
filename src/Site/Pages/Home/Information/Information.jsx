import React from 'react';

import iCSS from './info.module.css';

export default function Info() {

    return <React.Fragment>

        <div className={iCSS.container}>

            <div className={iCSS.info_det}>

                <i className="fa-regular fa-clock"></i>

                <div className={iCSS.det_info}>

                    <h3>Open Hours</h3>

                    <p>Monday - Friday | 8:00am- 9:00pm</p>
                    <p>Saturday - Sunday | 8:00am- 4:00pm</p>

                </div>

            </div>

            <div className={iCSS.info_det}>

                <i className="fa-solid fa-phone"></i>

                <div className={iCSS.det_info}>

                    <h3>Phone</h3>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.</p>
                    <p className={iCSS.line}>+1 (555) 000-0000</p>

                </div>

            </div>

            <div className={iCSS.info_det}>

                <i className="fa-solid fa-location-dot"></i>

                <div className={iCSS.det_info}>

                    <h3>Office</h3>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.</p>
                    <p className={iCSS.line}>123 Sample St, Sydney NSW 2000 AU</p>

                </div>

            </div>

        </div>

    </React.Fragment>

}
