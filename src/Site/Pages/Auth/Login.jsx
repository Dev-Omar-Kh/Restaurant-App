import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import lCSS from './auth.module.css';

import eye from '../../Images/SVG/eye-icon-svg.svg';
import eyeSlash from '../../Images/SVG/eye-slash-icon-svg.svg';
import { useNavigate } from 'react-router-dom';
import Status from '../../Components/Status/Status';
import { useFormik } from 'formik';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';

export default function Login({verify}) {

    // ====== send-data-to-back-end ====== //

    const [successMsg, setSuccessMsg] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const userValue = {

        email : "",
        password : "",

    }

    const registerHandle = async(values) => {

        setLoading(true);

        const {data} = await axios.post('https://restaurant-six-snowy.vercel.app/auth/login' , values);
        console.log(data);
        
        if(data.success){
            setSuccessMsg('Login processed successfully. Welcome!');

            setTimeout(() => {
                navigate('/')
            } , 3500)
        }
        else{setErrMsg('Login failed. Something is wrong, try again!')}

        setLoading(false);

    }

    const formikObj = useFormik({

        initialValues : userValue,

        onSubmit : registerHandle,

        validate : (values) => {

            setErrMsg(null);

            const errors = {};

            if(!values.email.includes('@') || !values.email.includes('.')){
                errors.email = 'Email is invalid';
            }

            if(values.password.length < 6){
                errors.password = 'The password is shorter than 8 characters';
            }

            if(values.password.length > 12){
                errors.password = 'The password is longer than 12 characters';
            }

            return errors;

        }

    });

    // ====== display-error-message ====== //

    const [visible, setVisible] = useState(true);

    // ====== ui-handling ====== //

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

    const verifyVariants ={

        hidden : {opacity : 0},
        visible : {opacity : 1},
        transition : {duration : 0.3}

    }

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <motion.form 
            onSubmit={formikObj.handleSubmit}
            variants={formVariants} initial='hidden' animate='visible' transition='transition' exit='hidden'
            id={loading ? lCSS.opacity_low : ''} className={lCSS.form + ' ' + lCSS.login}
        >

            {verify && <motion.div variants={verifyVariants} className={lCSS.verify_msg}>{verify}</motion.div>}

            <div className={lCSS.input_cont}>

                <div className={lCSS.loader}></div>

                <label htmlFor="email">
                    <span className={lCSS.label_title}>Email :</span>
                    <span className={lCSS.label_error_msg}>
                        {formikObj.errors.email && formikObj.touched.email ? <>* {formikObj.errors.email}</> : ''}
                    </span>
                </label>

                <input
                    disabled={loading}
                    id='email' type="text" placeholder='Example@gmial.com' 
                    onBlur={formikObj.handleBlur}
                    onChange={formikObj.handleChange} value={formikObj.values.email} 
                />

            </div>

            <div className={lCSS.input_cont}>

                <label htmlFor="password">
                    <span className={lCSS.label_title}>Password :</span>
                    <span className={lCSS.label_error_msg}>
                        {formikObj.errors.password && formikObj.touched.password ? <>* {formikObj.errors.password}</> : ''}
                    </span>
                </label>

                <input 
                    disabled={loading}
                    id='password' type={passwordShowLogin ? "text" : "password"} 
                    onBlur={formikObj.handleBlur}
                    onChange={formikObj.handleChange} value={formikObj.values.password} 
                />

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

            <motion.button whileTap={{scale : 0.95}} className={lCSS.submit} type='submit'>
                {loading ? 
                    <ThreeCircles
                        visible={true} height="20" width="20" color="#F1FAEE"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    />
                    :
                    'Sign In'
                }
            </motion.button>

        </motion.form>


    </React.Fragment>

}
