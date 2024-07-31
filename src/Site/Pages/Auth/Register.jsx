import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import lCSS from './auth.module.css';

import eye from '../../Images/SVG/eye-icon-svg.svg';
import eyeSlash from '../../Images/SVG/eye-slash-icon-svg.svg';

export default function Register() {

    const [passwordShowRegister1, setPasswordShowRegister1] = useState(false);
    const [passwordShowRegister2, setPasswordShowRegister2] = useState(false);

    useEffect(() => {

        const passwordShowRegister1 = document.getElementById('showPasswordRegister1');
        const passwordShowRegister2 = document.getElementById('showPasswordRegister2');

        passwordShowRegister1.onclick = () => {

            setPasswordShowRegister1(prevState => !prevState);

        }

        passwordShowRegister2.onclick = () => {

            setPasswordShowRegister2(prevState => !prevState);

        }

    } , [passwordShowRegister1 , passwordShowRegister2]);

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
            className={lCSS.form + ' ' + lCSS.register}
        >

            <div className={lCSS.input_cont}>

                <div className={lCSS.loader}></div>
                <label htmlFor="name">Name :</label>
                <input id='name' type="text" placeholder='' />

            </div>

            <div className={lCSS.input_cont}>

                <div className={lCSS.loader}></div>
                <label htmlFor="email">Email :</label>
                <input id='email' type="text" placeholder='Example@gmial.com' />

            </div>

            <div className={lCSS.input_cont}>

                <label htmlFor="password">Password :</label>
                <input id='password' type={passwordShowRegister1 ? "text" : "password"} />

                <div id='showPasswordRegister1' className={lCSS.eye_cont}>

                    <div className={lCSS.eyes}>

                        {passwordShowRegister1 && 
                            <AnimatePresence>
                                <motion.img 
                                    variants={viewEye} initial='hidden' animate='visible' 
                                    exit='hidden' className={lCSS.icon_cont} 
                                    src={eyeSlash} alt="eyeSlash" 
                                />
                            </AnimatePresence>
                        }

                        {!passwordShowRegister1 &&
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

            <div className={lCSS.input_cont}>

                <label htmlFor="cPassword">Confirm Password :</label>
                <input id='cPassword' type={passwordShowRegister2 ? "text" : "password"} />

                <div id='showPasswordRegister2' className={lCSS.eye_cont}>

                    <div className={lCSS.eyes}>

                        {passwordShowRegister2 && 
                            <AnimatePresence>
                                <motion.img 
                                    variants={viewEye} initial='hidden' animate='visible' 
                                    exit='hidden' className={lCSS.icon_cont} 
                                    src={eyeSlash} alt="eyeSlash" 
                                />
                            </AnimatePresence>
                        }

                        {!passwordShowRegister2 &&
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