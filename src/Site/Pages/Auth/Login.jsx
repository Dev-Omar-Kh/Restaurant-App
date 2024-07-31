import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import lCSS from './auth.module.css';

import eye from '../../Images/SVG/eye-icon-svg.svg';
import eyeSlash from '../../Images/SVG/eye-slash-icon-svg.svg';

export default function Login() {

    const [passwordShowLogin, setPasswordShow] = useState(false);

    useEffect(() => {

        const showPassword = document.getElementById('showPasswordLogin');

        showPassword.onclick = () => {

            setPasswordShow(prevState => !prevState);

        }

    } , [passwordShowLogin]);

    const viewEye = {

        hidden : {opacity : 0 , transition : {duration : 0.5}},
        visible : {opacity : 1 , transition : {duration : 0.5}},

    }

    const formVariants = {

        hidden : {opacity : 0 , scale : 1.1},
        visible : {opacity : 1 , scale : 1},
        transition : {duration : 0.5}

    }

    return <React.Fragment>

        <motion.form 
            variants={formVariants} initial='hidden' animate='visible' transition='transition' exit='hidden'
            className={lCSS.form + ' ' + lCSS.login}
        >

            <div className={lCSS.input_cont}>

                <div className={lCSS.loader}></div>
                <label htmlFor="email">Email :</label>
                <input id='email' type="text" placeholder='Example@gmial.com' />

            </div>

            <div className={lCSS.input_cont}>

                <label htmlFor="password">Password :</label>
                <input id='password' type={passwordShowLogin ? "text" : "password"} />

                <div id='showPasswordLogin' className={lCSS.eye_cont}>

                    <div className={lCSS.eyes}>

                        {passwordShowLogin && 
                            <AnimatePresence>
                                <motion.img 
                                    variants={viewEye} initial='hidden' animate='visible' 
                                    exit='hidden' className={lCSS.icon_cont} 
                                    src={eyeSlash} alt="eyeSlash" 
                                />
                            </AnimatePresence>
                        }

                        {!passwordShowLogin &&
                            <AnimatePresence>
                                <motion.img 
                                    variants={viewEye} initial='hidden' animate='visible' 
                                    exit='hidden' className={lCSS.icon_cont} 
                                    src={eye} alt="eye" 
                                />
                            </AnimatePresence>
                        }

                    </div>

                </div>

            </div>

            <div className={lCSS.check_box}>

                <label className={lCSS.check_box}>

                    <input type="checkbox" />
                    <div className={lCSS.checkmark}></div>
                    <p>Remember me</p>

                </label>

            </div>

            <button className={lCSS.submit} type='submit'>Sign In</button>

        </motion.form>


    </React.Fragment>

}
