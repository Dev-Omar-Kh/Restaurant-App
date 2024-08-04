import React from 'react';
import { motion } from "framer-motion";

import sCSS from './search_bar.module.css';

export default function SearchBar({display}) {

    const divVariants = {

        hidden : {opacity : 0},
        visible : {opacity : 1 , transition : {duration : 0.2}},
        exit : {opacity : 0 , transition : {duration : 0.2, when : 'afterChildren'}},

    }

    const childVariants = {

        hidden : {y : 20 , opacity : 0},
        visible : {y : 0 , opacity : 1 , transition : {duration : 0.2}},
        exit : {y : 20 , opacity : 0 , transition : {duration : 0.2}},

    }

    const closeBar = () =>{

        display(false);

    }

    return <React.Fragment>

        <motion.div className={sCSS.container} variants={divVariants} initial='hidden' animate='visible' exit='exit'>

            <motion.span onClick={closeBar}className={sCSS.span} variants={childVariants}><i className="fa-solid fa-xmark"></i></motion.span>

            <motion.form className={sCSS.form} variants={childVariants}>

                <input className={sCSS.input} type="text" placeholder='What are you looking for...' />

                <button className={sCSS.button} type='submit'>Search</button>

            </motion.form>

        </motion.div>

    </React.Fragment>

}
