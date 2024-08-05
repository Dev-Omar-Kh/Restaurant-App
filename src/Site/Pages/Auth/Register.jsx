import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import lCSS from './auth.module.css';

import eye from '../../Images/SVG/eye-icon-svg.svg';
import eyeSlash from '../../Images/SVG/eye-slash-icon-svg.svg';
import { useFormik } from 'formik';
import axios from 'axios';
import Status from '../../Components/Status/Status';
import { ThreeCircles } from 'react-loader-spinner';

export default function Register({setVerify , type , setScrollTop}) {

    // ====== send-data-to-back-end ====== //

    const [successMsg, setSuccessMsg] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const userValue = {

        userName : "",
        email : "",
        password : "",
        confirmPassword : ""

    }

    const registerHandle = async(values) => {

        setLoading(true);


        const {data} = await axios.post('https://restaurant-six-snowy.vercel.app/auth/register' , values);
        if(data.success){

            setSuccessMsg('Registration successful. Go to gmail to verify your email');

            setTimeout(() => {
                type(true);
                setScrollTop(true);
            } , 3500);

            setVerify('* Check emails to verify your account');

        }
        else{setErrMsg('Registration failed. This email already registered!')}


        setLoading(false);

    }

    const formikObj = useFormik({

        initialValues : userValue,

        onSubmit : registerHandle,

        validate : (values) => {

            setErrMsg(null);

            const errors = {};

            if(values.userName.length < 4){
                errors.userName = 'Name is too short';
            }

            if(!values.email.includes('@') || !values.email.includes('.')){
                errors.email = 'Email is invalid';
            }

            if(values.password.length < 6){
                errors.password = 'The password is shorter than 6 characters';
            }

            if(values.password.length > 12){
                errors.password = 'The password is longer than 12 characters';
            }

            if(values.confirmPassword !== values.password){
                errors.confirmPassword = "Password doesn't match"
            }

            return errors;

        }

    });

    // ====== display-error-message ====== //

    const [visible, setVisible] = useState(true);

    // ====== ui-handling ====== //

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

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <motion.form 
            onSubmit={formikObj.handleSubmit}
            variants={formVariants} initial='hidden' animate='visible' transition='transition' exit='hidden'
            id={loading ? lCSS.opacity_low : ''} className={lCSS.form + ' ' + lCSS.register}
        >

            <div className={lCSS.input_cont}>

                <div className={lCSS.loader}></div>
                <label htmlFor="userName">
                    <span className={lCSS.label_title}>Name :</span>
                    <span className={lCSS.label_error_msg}>
                        {formikObj.errors.userName && formikObj.touched.userName ? <>* {formikObj.errors.userName}</> : ''}
                    </span>
                </label>
                <input
                    disabled={loading}
                    id='userName' type="text" placeholder='' 
                    onBlur={formikObj.handleBlur}
                    onChange={formikObj.handleChange} value={formikObj.values.userName} 
                />

            </div>

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
                    id='password' type={passwordShowRegister1 ? "text" : "password"} 
                    onBlur={formikObj.handleBlur}
                    onChange={formikObj.handleChange} value={formikObj.values.password} 
                />

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

                <label htmlFor="confirmPassword">
                    <span className={lCSS.label_title}>Confirm Password :</span>
                    <span className={lCSS.label_error_msg}>
                        {formikObj.errors.confirmPassword && formikObj.touched.confirmPassword ?
                            <>* {formikObj.errors.confirmPassword}</>
                            :
                            ''
                        }
                    </span>
                </label>
                <input
                    disabled={loading}
                    id='confirmPassword' type={passwordShowRegister2 ? "text" : "password"} 
                    onBlur={formikObj.handleBlur}
                    onChange={formikObj.handleChange} value={formikObj.values.confirmPassword}
                />

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