import React from 'react';

import sCSS from './services.module.css';
import AnimatedNumber from './ServicesCount';
import { motion } from 'framer-motion';

export default function Services() {

    const parentVariants = {

        hidden : {opacity : 1},
        visible : {opacity : 1 , transition : {duration : 0.3 , type : 'spring'}}

    }

    const childVariantsLeft = {

        hidden : {opacity : 0 , x : 50},
        visible : {opacity : 1 , x : 0 , transition : {duration : 0.3}}

    }

    const childVariantsRight = {

        hidden : {opacity : 0 , x : -50},
        visible : {opacity : 1 , x : 0 , transition : {duration : 0.3}}

    }

    return <React.Fragment>

        <motion.div 
            variants={parentVariants} 
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.6 }}
            className={sCSS.container}
        >

            <motion.h3 variants={childVariantsLeft}>Our Achievements</motion.h3>

            <motion.p variants={childVariantsRight} className={sCSS.title_p}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Suspendisse varius enim in eros elementum tristique. Duis cursus, 
                mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
            </motion.p>

            <div className={sCSS.numbers}>

                <div className={sCSS.numbs_cont}>

                    <AnimatedNumber
                        targetNumber={200}
                        increment={10}
                        duration={50}
                        label="Customer Served"
                    />

                </div>

                <div className={sCSS.numbs_cont}>

                    <AnimatedNumber
                        targetNumber={5000}
                        increment={250}
                        duration={50}
                        label="Branches"
                    />

                </div>

                <div className={sCSS.numbs_cont}>

                    <AnimatedNumber
                        targetNumber={370000}
                        increment={18500}
                        duration={50}
                        label="Deliveries"
                    />

                </div>

                <div className={sCSS.numbs_cont}>

                    <AnimatedNumber
                        targetNumber={100}
                        increment={5}
                        duration={50}
                        label="Recognition"
                    />

                </div>

            </div>

        </motion.div>

    </React.Fragment>

}
