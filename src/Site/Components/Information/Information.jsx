import React, { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';

import iCSS from './info.module.css';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoData } from '../../Store/InfoSlice';
import { ThreeCircles } from 'react-loader-spinner';

const time = require('../../Images/JSON/clock.json');
const phone = require('../../Images/JSON/phone.json');
const location = require('../../Images/JSON/location.json');

export default function Info() {

    // ====== call-data ====== //

    const dispatch = useDispatch();
    const {dataInfo , isLoading} = useSelector((store) => store.info);

    useEffect(() => {

        dispatch(getInfoData());

    } , [dispatch]);

    // ====== lord-icon ====== //

    const timeRef = useRef(null);
    const phoneRef = useRef(null);
    const locationRef = useRef(null);

    useEffect(() => {
        const playAnimation = (ref, interval) => {
            const playAndRepeat = () => {
                if (ref.current) {
                    ref.current.playFromBeginning();
                }
                setTimeout(playAndRepeat, interval);
            };
            playAndRepeat();
        };

        playAnimation(timeRef, 5000);
        playAnimation(phoneRef, 6000);
        playAnimation(locationRef, 7000);

    }, []);

    // ====== animation ====== //

    const parentVariants = {

        hidden : {opacity : 0},
        visible : {opacity : 1 , transition : {duration : 0.3 , type : 'spring' , staggerChildren: 0.3}}

    }

    const childVariants = {

        hidden : {opacity : 0 , y : 50},
        visible : {opacity : 1 , y : 0 , transition : {duration : 0.3}}

    }

    return <React.Fragment>

        <motion.div 
            variants={parentVariants} 
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.4 }}
            className={iCSS.container}
        >

            <motion.div variants={childVariants} className={iCSS.info_box}>

                <div className={iCSS.info_icon}>

                    <Player
                        size={80} ref={timeRef}
                        trigger="hover" icon={time}
                    />

                </div>

                {isLoading ? <div className={iCSS.load_cont}>

                    <ThreeCircles
                        visible={true} height="80" width="80" color="var(--dark-color-2)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    />

                </div> : <div className={iCSS.info_det}>

                    <h3>Open Hours</h3>
                    <p>{dataInfo.fullTime.day} | {dataInfo.fullTime.time}</p>
                    <p>{dataInfo.partTime.day} | {dataInfo.partTime.time}</p>

                </div>}

            </motion.div>

            <motion.div variants={childVariants} className={iCSS.info_box}>

                <div className={iCSS.info_icon}>

                    <Player
                        size={80} ref={phoneRef}
                        trigger="hover" icon={phone}
                    />

                </div>

                {isLoading ? <div className={iCSS.load_cont}>

                    <ThreeCircles
                        visible={true} height="80" width="80" color="var(--dark-color-2)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    />

                </div> : <div className={iCSS.info_det}>

                    <h3>Phone</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.</p>
                    <p className={iCSS.line_bottom}>+{dataInfo.phoneNumber}</p>

                </div>}

            </motion.div>

            <motion.div variants={childVariants} className={iCSS.info_box}>

                <div className={iCSS.info_icon}>

                    <Player
                        size={80} ref={locationRef}
                        trigger="hover" icon={location}
                    />

                </div>

                {isLoading ? <div className={iCSS.load_cont}>

                    <ThreeCircles
                        visible={true} height="80" width="80" color="var(--dark-color-2)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    />

                </div> : <div className={iCSS.info_det}>

                    <h3>Office</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.</p>
                    <p className={iCSS.line_bottom}>{dataInfo.email}</p>

                </div>}

            </motion.div>

        </motion.div>

    </React.Fragment>

}
