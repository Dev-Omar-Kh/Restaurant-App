import React, { useEffect } from 'react';

import wCSS from './welcome.module.css';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const data = [

    {
        img : require('../../Images/welcome-min.jpg'),
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
        img : require('../../Images/about-min.jpg'),
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

    const preloadImage = (url) => {

        const img = new Image();
        img.src = url;

    };

    useEffect(() => {

        data.forEach(card => preloadImage(card.img));

    }, []);

    const imgVariants = {

        hidden : {opacity : 0 , x : 50},
        visible : {opacity : 1 , x : 0 , transition : {type: 'spring' , duration : 0.3}},

    }

    const textVariants = {

        hidden : {opacity : 0 , x : -50},
        visible : {
            opacity : 1 , 
            x : 0 , 
            transition : {type: 'spring' , duration : 0.3 , when: 'beforeChildren', staggerChildren: 0.3}
        },

    }

    const childVariants = {

        hidden : {opacity : 0 , y : 50},
        visible : {opacity : 1 , y : 0 , transition : {type: 'spring' , duration : 0.3}},

    }

    return <React.Fragment>

        <div className={wCSS.container}>

            {data.map((card , idx) => {
                return <div key={idx} className={wCSS.welcome_box}>

                    <motion.div 
                        variants={textVariants} 
                        initial='hidden' whileInView='visible' 
                        viewport={{ once: true, amount: 0.6 }}
                        className={wCSS.box_det}
                    >

                        <motion.h3 variants={childVariants}>{card.title}</motion.h3>

                        <motion.p variants={childVariants}> {card.dis} </motion.p>

                        <motion.button variants={childVariants}>View Dishes</motion.button>

                    </motion.div>

                    <motion.div 
                        variants={imgVariants} 
                        initial='hidden' whileInView='visible' 
                        viewport={{ once: true, amount: 0.6 }}
                        className={wCSS.box_img}
                    >

                        {/* <img src={card.img} alt={card.title} loading="lazy" /> */}

                        <LazyLoadImage
                            effect="blur"
                            src={card.img}
                            alt={card.title}
                            placeholderSrc={require('../../Images/notFound.jpg')}
                            width="100%"
                            height='100%'
                        />

                    </motion.div>

                </div>
            })}

        </div>

    </React.Fragment>

}
