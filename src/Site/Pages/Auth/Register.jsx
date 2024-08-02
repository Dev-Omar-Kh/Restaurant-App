import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import lCSS from './auth.module.css';

import eye from '../../Images/SVG/eye-icon-svg.svg';
import eyeSlash from '../../Images/SVG/eye-slash-icon-svg.svg';
import { useFormik } from 'formik';
import axios from 'axios';

export default function Register() {

    // ====== send-data-to-back-end ====== //

    const userValue = {

        userName : "",
        email : "",
        password : "",
        confirmPassword : ""

    }

    const registerHandle = async(values) => {

        try{

            const {data} = await axios.post('https://restaurant-six-snowy.vercel.app/auth/register' , values);
            if(data.success){
                console.log('welcome');
            }

        }
        catch(err){
            console.log(err);
        }

    }

    const formikObj = useFormik({

        initialValues : userValue,

        onSubmit : registerHandle,

        validate : (values) => {

            const errors = {};

            if(values.userName.length < 4){
                errors.userName = 'Name is too short';
            }

            if(!values.email.includes('@') || !values.email.includes('.')){
                errors.email = 'Email is invalid';
            }

            if(values.password.length < 6){
                errors.password = 'The password is shorter than 8 characters';
            }

            if(values.password.length > 12){
                errors.password = 'The password is longer than 12 characters';
            }

            if(values.confirmPassword !== values.password){
                errors.confirmPassword = "Password doesn't match"
            }

            return errors;

        }

    })

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

        <motion.form 
            onSubmit={formikObj.handleSubmit}
            variants={formVariants} initial='hidden' animate='visible' transition='transition' exit='hidden'
            className={lCSS.form + ' ' + lCSS.register}
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

            <button className={lCSS.submit} type='submit'>Sign In</button>

        </motion.form>


    </React.Fragment>

}