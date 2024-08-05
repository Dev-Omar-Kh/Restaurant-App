import React from 'react';

import mCSS from './main.module.css';
import { motion } from 'framer-motion';

export default function Main() {

    const h3 = "Experience the real taste of Best Dishes";
    const p = "Experience the real taste of Dishes";

    const parentVariants = {

        hidden : {opacity : 0 , scale : 1.2},
        visible : {opacity : 1 , scale : 1 , transition : {type: 'wheel' , when : 'beforeChildren' , staggerChildren : 0.05}},
        transition : {duration : 0.1}

    }

    const childVariants = {

        hidden : {opacity : 0},
        visible : {opacity : 1},

    }

    return <React.Fragment>

        <motion.div variants={parentVariants} initial='hidden' animate='visible' transition='transition' className={mCSS.container}>

            <div className={mCSS.main_det}>

                <h3>{h3.split('').map((char , idx) => {

                    return  <motion.span key={idx} variants={childVariants}>{char}</motion.span>

                })}</h3>

                <p>{p.split('').map((char , idx) => {

                    return  <motion.span key={idx} variants={childVariants}>{char}</motion.span>

                })}</p>

                <motion.div variants={parentVariants} className={mCSS.det_btns}>

                    <motion.a variants={childVariants} href="#fff">View Dishes</motion.a>
                    <motion.a variants={childVariants} href="#fff">View Menu</motion.a>

                </motion.div>

            </div>

        </motion.div>

    </React.Fragment>

}
