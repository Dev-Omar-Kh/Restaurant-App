import React, { useEffect, useState } from 'react';

import rCSS from './reviews.module.css';
import ReviewCard from '../Review-card/ReviewCard';
import { motion } from 'framer-motion';

export default function ReviewsCont() {

    // ====== handle-scroll ====== //

    const [cardWidth, setCardWidth] = useState(0);
    const [count, setCount] = useState(1);
    const [widthCount, setWidthCount] = useState(0);

    useEffect(() => {

        const scroll_rev = document.getElementById('scroll_rev');
        const next = document.getElementById('next');
        const screenWidth = window.screen.width;
        const prev = document.getElementById('prev');

        if(screenWidth > 583){setWidthCount(2)}
        else if(screenWidth < 583){setWidthCount(1)}

        const handleNext = () => {

            if((scroll_rev.offsetWidth - 2) >= ((cardWidth + 16) * (count + widthCount))){

                setCount((prevCount) => (prevCount + 1));
                scroll_rev.style.transform = `translateX(-${(cardWidth + 16) * count}px)`;

            }

        }

        if((scroll_rev.offsetWidth - 2) < ((cardWidth + 16) * (count + widthCount))){

            next.style.opacity = '0.6';

        }
        else{next.style.opacity = '1'}

        const handlePrev = () => {

            if(count > 1){

                setCount((prevCount) => {

                    const newCount = prevCount - 1;
                    scroll_rev.style.transform = `translateX(-${(cardWidth + 16) * (newCount - 1)}px)`;
                    return newCount;

                });

            }

        }

        if(count <= 1){

            prev.style.opacity = '0.6'

        }
        else{prev.style.opacity = '1'}

        next.addEventListener('click', handleNext);
        prev.addEventListener('click', handlePrev);

        return () =>{

            next.removeEventListener('click', handleNext);
            prev.removeEventListener('click', handlePrev);

        }

    } , [cardWidth , count , widthCount]);

    // ====== animation ====== //

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

        <div
            className={rCSS.container}
        >

            <motion.div 
                variants={parentVariants} 
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.6 }}
                className={rCSS.title}
            >

                <motion.h3 variants={childVariantsLeft}>Our Happy Customers</motion.h3>

                <motion.p variants={childVariantsRight}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</motion.p>

            </motion.div>

            <div className={rCSS.cont_scroll}>

                <div id='scroll_rev' className={rCSS.scroll}>

                    {[1,2,3,4,5,6,7,8,9,10,11,12].map( card => <ReviewCard key={card} width={setCardWidth} />)}

                </div>

                <div className={rCSS.actions}>

                    <motion.button aria-label='prev card' id='prev' whileTap={{scale : 0.85}}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </motion.button>

                    <motion.button aria-label='next card' id='next' whileTap={{scale : 0.85}}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </motion.button>

                </div>

            </div>

        </div>

    </React.Fragment>

}
