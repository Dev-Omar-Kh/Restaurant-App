import React, { useEffect } from 'react';

import rcCSS from './review_card.module.css';
import { motion } from 'framer-motion';

export default function ReviewCard({width}) {

    useEffect(() => {

        const card = document.getElementById('card');
        width(card.offsetWidth);

    });

    // ====== animation ====== //

    const childVariantsTop = {

        hidden : {opacity : 0 , y : 30},
        visible : {opacity : 1 , y : 0 , transition : {duration : 0.3}}

    }

    return <React.Fragment>

        <motion.div 
            variants={childVariantsTop} 
            initial='hidden'
            whileInView='visible'
            viewport={{ once: false, amount: 0.6 }}
            id='card' 
            className={rcCSS.rev_box}
        >

            <div className={rcCSS.person}>

                <div className={rcCSS.img}>

                    <img src={require('../../../..//Images/pfp.png')} alt="" />

                </div>

                <div className={rcCSS.info}>

                    <h3>Name</h3>

                    <p>email@email.com</p>

                    <div className={rcCSS.rate}>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star-half-stroke"></i>
                    </div>

                </div>

            </div>

            <div className={rcCSS.message}>

                <p>
                    <span>"</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Suspendisse varius enim in eros elementum tristique. 
                    Duis cursus, mi quis viverra ornare.<span>"</span>
                </p>

            </div>

        </motion.div>

    </React.Fragment>

}
