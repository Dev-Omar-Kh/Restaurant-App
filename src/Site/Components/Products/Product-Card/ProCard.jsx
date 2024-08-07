import React from 'react';

import pcCSS from './pro-card.module.css';
import { motion } from 'framer-motion';

export default function ProCard() {

  // ====== animation ====== //

  const cardVariants = {

    hidden : {opacity : 0 , scale : 0.5},
      visible : {opacity : 1 , scale : 1 , transition : {duration : 0.3 , type : 'spring'}},

  }

  return <React.Fragment>

    <motion.div
      variants={cardVariants} 
      className={pcCSS.card}
    >

      <div className={pcCSS.actions}>

        <span><i className="fa-regular fa-heart"></i></span>
        <span><i className="fa-solid fa-cart-shopping"></i></span>

      </div>

      <img src={require('../../../Images/auth_bg.jpg')} alt="" />

      <h3>Fruit Salad</h3>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>

      <span>128 EGP</span>

    </motion.div>

  </React.Fragment>

}
