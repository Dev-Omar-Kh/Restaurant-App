import React from 'react';

import wCSS from './welcome.module.css';

const data = [

    {
        img : require('../../Images/welcome.png'),
        title : 'Welcome to Our Restaurant',
        dis : `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Suspendisse varius enim in eros elementum tristique. 
            Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, 
            ut commodo diam libero vitae erat.

            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Suspendisse varius enim in eros elementum tristique. 
            Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, 
            ut commodo diam libero vitae erat.
        `,
    },

    {
        img : require('../../Images/about.png'),
        title : 'About Us',
        dis : `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Suspendisse varius enim in eros elementum tristique. 
            Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, 
            ut commodo diam libero vitae erat. 
            
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. 
            Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, 
            ut commodo diam libero vitae erat.
        `,
    },

]

export default function Welcome() {

    return <React.Fragment>

        <div className={wCSS.container}>

            {data.map((card , idx) => {
                return <div key={idx} className={wCSS.welcome_box}>

                    <div className={wCSS.box_det}>

                        <h3>{card.title}</h3>

                        <p> {card.dis} </p>

                        <button>View Dishes</button>

                    </div>

                    <div className={wCSS.box_img}>

                        <img loading='lazy' src={card.img} alt="" />

                    </div>

                </div>
            })}

        </div>

    </React.Fragment>

}
