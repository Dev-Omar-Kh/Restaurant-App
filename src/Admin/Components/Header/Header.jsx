import React from 'react';
import {motion} from 'framer-motion'

import hCSS from './header.module.css';
import { Link } from 'react-router-dom';

export default function Header({clickNav}) {

    return <React.Fragment>

        <div className={hCSS.container}>

            <div className={hCSS.header}>

                <motion.div whileTap={{scale : 0.8}} onClick={() => clickNav(prevValue => !prevValue)} className={hCSS.nav_ph}>
                    <i className="fa-solid fa-bars-staggered"></i>
                </motion.div>

                <form className={hCSS.form}>

                    <input type="text" placeholder='Search about something...'/>
                    <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>

                </form>

                <div className={hCSS.more}>

                    <Link to={'/'}>Go to website</Link>

                </div>

            </div>

        </div>

    </React.Fragment>

}
