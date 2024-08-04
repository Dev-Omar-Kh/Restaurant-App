import React, { useEffect, useState } from 'react';

import aCSS from './auth.module.css';
import Login from './Login';
import Register from './Register';
import { AnimatePresence } from 'framer-motion';

export default function Auth() {

    const [typeLogin, setTypeLogin] = useState(true);
    const [verifyMsg, setVerifyMsg] = useState(null);

    useEffect(() => {

        const convertType = document.getElementById('convertType');
        const overDet = document.getElementById('overDet');
        const overView = document.getElementById('overView');

        convertType.onclick = () => {

            setTypeLogin(prevState => !prevState);

            overView.classList.add(aCSS.scale_big)
            setTimeout(() => {overView.classList.remove(aCSS.scale_big);} , 300);

            overDet.classList.add(aCSS.opacity_frame);
            setTimeout(() => {overDet.classList.remove(aCSS.opacity_frame);} , 1000);

        }

        if(!typeLogin){overView.classList.add(aCSS.translate_left);}
        else{overView.classList.remove(aCSS.translate_left);}

    })

    return <React.Fragment>

        <div className={aCSS.container}>

            <div className={aCSS.auth_box}>

                <div id='overView' className={aCSS.over_view}>

                    <div id='overDet' className={aCSS.over_det}>

                        <h3>{typeLogin ?'Sign In' : 'Register'}</h3>

                        <p>
                            {typeLogin ?
                                'Welcome back to the restaurant. Log in for a better experience' 
                                :
                                'Welcome to the restaurant. Create an account and become part of our family'
                            }
                        </p>

                        <div className={aCSS.change_cont}>

                            <button id='convertType'>
                                {!typeLogin && <i className="fa-solid fa-angle-left"></i>}
                                {typeLogin ? 'Create account' : 'Already have Account'}
                                {typeLogin && <i className="fa-solid fa-angle-right"></i>}
                            </button>

                        </div>

                    </div>

                </div>

                <AnimatePresence>

                    {typeLogin && <Login verify={verifyMsg} />}

                </AnimatePresence>

                <AnimatePresence>

                    {!typeLogin && <Register setVerify={setVerifyMsg} type={setTypeLogin} />}

                </AnimatePresence>

            </div>

        </div>

    </React.Fragment>

}
