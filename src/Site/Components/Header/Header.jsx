import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SearchBar from './Search-Bar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoData } from '../../Store/InfoSlice';
import { motion } from 'framer-motion';
import { ThreeCircles } from 'react-loader-spinner';

import hCSS from './header.module.css';
import './active.css';

export default function Header() {

    // ====== call-data ====== //

    const dispatch = useDispatch();
    const {dataInfo , isLoading} = useSelector((store) => store.info);

    useEffect(() => {

        dispatch(getInfoData());

    } , [dispatch]);

    // ====== nav-for-phone ======

    useEffect(() => {

        const navPh = document.getElementById('nav_ph');
        const nav = document.getElementById('nav');

        navPh.onclick = () => {

            navPh.classList.toggle(hCSS.change);
            nav.classList.toggle(hCSS.display_nav);

        }

        nav.onclick = () => {

            navPh.classList.toggle(hCSS.change);
            nav.classList.toggle(hCSS.display_nav);

        }

    } , []);

    // ====== info-moving ======

    const [screenWidth, setScreenWidth] = useState(window.screen.width);
    const [scrollStarted, setScrollStarted] = useState(false);
    const [moveCount, setMoveCount] = useState(0);
    const [timer, setTimer] = useState(0);

    useEffect(() => {

        const scroll = document.getElementById('scroll');
        const scrollCont = document.getElementById('scroll_cont');

        const handleScreenWidth  = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleScreenWidth);

        if(screenWidth <= 1355){

            setMoveCount(-(scroll.offsetWidth - scrollCont.offsetWidth));
            setTimer((20 - ((screenWidth / 1440) * 20)));
            setScrollStarted(true);

        }
        else{setScrollStarted(false)}

        return () => {
            window.removeEventListener('resize', handleScreenWidth);
        };

    } , [screenWidth , isLoading]);

    const infoVariants = {

        hidden : {x : 0},
        visible : scrollStarted ? {
            x : moveCount , 
            transition : {
                duration : timer , 
                type : 'linear' , ease: "linear", repeat: Infinity, repeatDelay: 1,
            }
        } : {x : 0}

    }

    // ====== search-bar ======

    const [display, setDisplay] = useState(false)

    const displaySearchBar = () => {

        setDisplay(true);

    };

    const closeSearchBar = (visible) => {

        setDisplay(visible);

    };

    // ====== JSX-CODE ======

    return <React.Fragment>

        <AnimatePresence>

            {display && <SearchBar display={closeSearchBar} />}

        </AnimatePresence>

        <header id='header' className={hCSS.container}>

            <div className={hCSS.info}>

                <div id='scroll_cont' className={hCSS.info_det}>

                    <div id='scroll' className={hCSS.scroll}>

                        <motion.div 
                            variants={infoVariants} 
                            initial='hidden' animate='visible'
                            id='scrolling' className={hCSS.scrolling}
                        >

                            {isLoading ? <div className={hCSS.load_cont}>

                                <ThreeCircles
                                    visible={true} height="20" width="20" color="var(--dark-color-2)"
                                    ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                                />

                            </div> : <><p>Email: {dataInfo.email}</p>
                            <p>Phone Number: {dataInfo.phoneNumber}</p>
                            <p>

                                <span className={hCSS.det_bold}>Opening Hours</span>
                                <span className={hCSS.line}></span>
                                <span className={hCSS.det_days}>{dataInfo.fullTime.day}</span>
                                <span>{dataInfo.fullTime.time}</span>

                            </p>
                            <p>

                                <span className={hCSS.det_days}>{dataInfo.partTime.day}</span>
                                <span>{dataInfo.partTime.time}</span>

                            </p></>}

                        </motion.div>

                    </div>

                </div>

                <div className={hCSS.info_social}>

                    <a aria-label='go to facebook' href="https://www.facebook.com/profile.php?id=100086035253116" rel="noreferrer" target='_blank'><i className="fa-brands fa-facebook-f"></i></a>
                    <a aria-label='go to instagram' href="https://www.instagram.com/omar.khaled_2004?igsh=Nm9ycWdzZjE1dmZy" rel="noreferrer" target='_blank'><i className="fa-brands fa-instagram"></i></a>
                    <a aria-label='go to twitter' href="https://x.com/Omarkhaled_2004?t=FRH4yPqTapuNsI08S8ZPDQ&s=09" rel="noreferrer" target='_blank'><i className="fa-brands fa-x-twitter"></i></a>
                    <a aria-label='go to youtube' href="https://www.youtube.com/" rel="noreferrer" target='_blank'><i className="fa-brands fa-youtube"></i></a>

                </div>

            </div>

            <span className={hCSS.header_line}></span>

            <div className={hCSS.header}>

                <div className={hCSS.logo}>

                    <Link to={'/'}>

                        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7929 4.5957V4.59675C15.776 4.62583 12.2955 10.6297 7.95067 17.96C3.59532 25.3081 0 31.1911 0 31.1911L12.3315 31.137L12.3323 31.1369L12.3297 31.1464C18.3172 31.0304 23.7182 27.0939 25.3119 21.1458C25.8102 19.2864 25.8853 17.4147 25.5964 15.626C24.8043 10.3587 20.9149 6.07496 15.7929 4.5957Z" fill="#E63946"/>
                            <path d="M22.6074 0.80957V0.810614C22.5905 0.839693 19.1099 6.84355 14.7651 14.1739C10.4098 21.522 6.81445 27.4049 6.81445 27.4049L19.1459 27.3509L19.1467 27.3507L19.1442 27.3603C25.1317 27.2443 30.5326 23.3078 32.1264 17.3597C32.6246 15.5003 32.6998 13.6286 32.4108 11.8398C31.6187 6.5726 27.7294 2.28883 22.6074 0.80957Z" fill="#1D3557"/>
                        </svg>

                        <p>Restaurant</p>

                    </Link>

                </div>

                <div id='nav_ph' className={hCSS.nav_ph}>

                    <span className={hCSS.nav_span}></span>
                    <span className={hCSS.nav_span}></span>
                    <span className={hCSS.nav_span}></span>

                </div>

                <nav id='nav' className={hCSS.nav}>

                    <ul>

                        <NavLink className='user_nav_link' to={'/'}><li>Home</li></NavLink>
                        <NavLink className='user_nav_link' to={'/about'}><li>About Us</li></NavLink>
                        <NavLink className='user_nav_link' to={'/menu'}><li>Menu</li></NavLink>
                        <NavLink className='user_nav_link' to={'/contact'}><li>Contact Us</li></NavLink>
                        <NavLink className='user_nav_link' to={'/achieve'}><li>Achievements</li></NavLink>

                    </ul>

                    <div className={hCSS.nav_more}>

                        <button onClick={displaySearchBar} className={hCSS.search}><span>Search</span> <i className="fa-solid fa-magnifying-glass"></i></button>
                        <Link to={'/auth'} className={hCSS.cart}><span>Sign In</span> <i className="fa-solid fa-user"></i></Link>

                    </div>

                </nav>

            </div>

        </header>

    </React.Fragment>

}
