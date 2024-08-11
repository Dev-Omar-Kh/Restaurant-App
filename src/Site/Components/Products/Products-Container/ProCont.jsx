import React, { useState } from 'react';

import pcCSS from './pro-cont.module.css';
import ProCard from '../Product-Card/ProCard';
import { motion } from 'framer-motion';

export default function ProCont() {

    // ====== filter-products ====== //

    const [filterActive, setFilterActive] = useState(0);

    const filters =['All', 'Rice', 'Sandwiches', 'Pizzas', 'Soap', 'Drinks'];

    const selectType = (type) =>{

        setFilterActive(type);

    }

    const filterStyle = (index) => ({

        backgroundColor : index === filterActive ? 'var(--dark-color-1-005)' : 'transparent'

    });

    // ====== animation ====== //

    const fTextVariants = {
        hidden : {opacity : 0 , x : 30},
        visible : {opacity : 1 , x : 0  , transition : {duration : 0.3 , type : 'spring'}},
    }

    const sTextVariants = {
        hidden : {opacity : 0 , x : -30},
        visible : {opacity : 1 , x : 0  , transition : {duration : 0.3 , type : 'spring'}},
    }

    const filterVariants = {
        hidden : {opacity : 0 , y : 30},
        visible : {opacity : 1 , y : 0  , transition : {duration : 0.3 , type : 'spring'}},
    }

    const cardParentVariants = {
        hidden : {opacity : 0},
        visible : {
            opacity : 1 , 
            transition : {duration : 0.3 , type : 'spring' , when: 'beforeChildren', staggerChildren: 0.1}
        },
    }

    return <React.Fragment>

        <div className={pcCSS.container}>

            <div className={pcCSS.title}>

                <motion.h3 
                    variants={fTextVariants} 
                    initial='hidden' whileInView='visible'
                    viewport={{ once: true, amount: 0.8 }}
                >Our Special Dishes</motion.h3>

                <motion.p
                    variants={sTextVariants} 
                    initial='hidden' whileInView='visible'
                    viewport={{ once: true, amount: 0.8 }}
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. </motion.p>

            </div>

            <motion.ul
                variants={filterVariants} 
                initial='hidden' whileInView='visible'
                viewport={{ once: true, amount: 1 }}
                className={pcCSS.filter}
            >

                <menu className={pcCSS.filter_scroll}>

                    {filters.map((type , idx) => <li aria-label='filter' key={idx} onClick={() => selectType(idx)} style={filterStyle(idx)}>{type}</li>)}

                </menu>

            </motion.ul>

            <motion.div 
                variants={cardParentVariants} 
                    initial='hidden' whileInView='visible'
                    viewport={{ once: true, amount: 0.05 }}
                className={pcCSS.card_cont}
            >

                {[1,2,3, 4, 5].map((card) => <ProCard key={card} />)}

            </motion.div>

        </div>

    </React.Fragment>

}
