import React, { useState } from 'react';

import dCSS from './ban.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';

export default function DelMsg({userData , ban , setBan , rerender , setSuccessMsg}) {

    // ====== handel-delete-user ====== //

    const [isLoading, setIsLoading] = useState(false);

    const deleteUser = async() => {

        setIsLoading(true);

        const {data} = await axios.delete(`https://restaurant-six-snowy.vercel.app/auth/${userData._id}`, {
            headers : {token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWMxZDMxZjkzMjA1ZTVmZGRkN2VmMCIsImVtYWlsIjoia2hhbGRtcnltNzY5QGdtYWlsLmNvbSIsImlhdCI6MTcyMjczMDU2NSwiZXhwIjoxNzIyOTAzMzY1fQ.iu_LX37JwtWcgrLcMo9DBg-T-Z8z-NgO41JumIi0BYU'}
        });

        if(data.success){

            rerender();
            setBan(false);
            setTimeout(() => {
                setSuccessMsg('The user has been successfully banned !');
            }, 200);

        }

        setIsLoading(false);

    }

    const handelDeleteUser = () => {

        deleteUser();

    }

    // ====== component-animation ====== //

    const parentVariant = {

        hidden : {opacity : 0},
        visible : {opacity : 1},
        transition : {duration : 0.2}

    }

    const childVariant = {

        hidden : {y : 50 , opacity : 0},
        visible : {y : 0 ,opacity : 1},
        transition : {duration : 0.2}

    }

    return <React.Fragment>

        <AnimatePresence>

            {ban && 
                <motion.div 
                    variants={parentVariant} initial='hidden' animate='visible' exit='hidden'  transition='transition'
                    className={dCSS.container}
                >

                    <motion.div variants={childVariant} className={dCSS.msg_box}>

                        <h3>Warning !</h3>

                        <p>Are you sure you want to ban the user <span>{userData.userName}</span> ?</p>

                        <div className={dCSS.action}>

                            <motion.button onClick={()=>setBan(false)} whileTap={{scale : 0.9}} className={dCSS.cancel}>
                                Cancel
                            </motion.button>
                            <motion.button onClick={handelDeleteUser} whileTap={{scale : 0.9}} className={dCSS.ban}>
                                {isLoading ?
                                    <ThreeCircles
                                        visible={true} height="20" width="20" color="#E63946"
                                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                                    />
                                    :
                                    <><i className="fa-solid fa-ban"></i>Ban</>
                                }
                            </motion.button>

                        </div>

                    </motion.div>

                </motion.div>
            }

        </AnimatePresence>

    </React.Fragment>

}
