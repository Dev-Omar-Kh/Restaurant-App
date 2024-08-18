import React, { useEffect } from 'react';

import mCSS from './main.module.css';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getMainData } from '../../Store/MainSlice';
import { ThreeCircles } from 'react-loader-spinner';

export default function Main() {

    // ====== get-data ====== //

    const {mainData , mainLoading} = useSelector(store => store.main);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getMainData());

    } , [dispatch]);

    // ====== animation ====== //

    const parentVariants = {

        hidden : {opacity : 0 , scale : 1.2},
        visible : {opacity : 1 , scale : 1 , transition : {
            duration : 0.3 , type: 'wheel' , when : 'beforeChildren' , staggerChildren : 0.03
        }},

    }

    const childVariants = {

        hidden : {opacity : 0 , y : 10},
        visible : {opacity : 1 , y : 0},

    }

    return <React.Fragment>

        <div className={mCSS.main}>

            {mainLoading ? <div
                style={{
                    width : '100%' , height : '80vh',
                    display : 'flex' , alignItems : 'center',
                    justifyContent : 'center'
                }}
            >

                <ThreeCircles
                    visible={true} height="100" width="100" color="var(--dark-color-2)"
                    ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                />

            </div> : <motion.div 
                variants={parentVariants} initial='hidden' animate='visible' 
                style={{backgroundImage : `url(${mainData.image.url})`}} className={mCSS.container}
            >

                <div className={mCSS.main_det}>

                    <h3>{mainData.title.split('').map((char , idx) => {

                        return  <motion.span key={idx} variants={childVariants}>{char}</motion.span>

                    })}</h3>

                    <p>{mainData.description.split('').map((char , idx) => {

                        return  <motion.span key={idx} variants={childVariants}>{char}</motion.span>

                    })}</p>

                    <motion.div variants={parentVariants} className={mCSS.det_btns}>

                        <motion.a variants={childVariants} href="#fff">View Dishes</motion.a>
                        <motion.a variants={childVariants} href="#fff">View Menu</motion.a>

                    </motion.div>

                </div>

            </motion.div>}

        </div>

    </React.Fragment>

}
