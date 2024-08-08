import React from 'react';

import pcCSS from './pro-card.module.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProCard() {

  // ====== animation ====== //

  const cardVariants = {

    hidden : {opacity : 0 , y : 30},
    visible : {opacity : 1 , y : 0 , transition : {duration : 0.3 , type : 'spring'}},

  }

  return <React.Fragment>

    <motion.div
      variants={cardVariants}
      className={pcCSS.card}
    >

      <Link >

        <div className={pcCSS.actions}>

          <span><i className="fa-regular fa-heart"></i></span>
          <span><i className="fa-regular fa-bookmark"></i></span>

        </div>

        <div className={pcCSS.img_cont}>

          <img src={require('../../../Images/auth_bg.jpg')} alt="" />

        </div>

        <div className={pcCSS.det_cont}>

          <div className={pcCSS.cate}>

            <span>Main Dish</span>
            <span>pastries</span>

          </div>

          <h3>Fruit Salad</h3>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>

          <div className={pcCSS.price}>

            <h6>180 EGP</h6>
            <h5>165 EGP</h5>

          </div>

        </div>
      
      </Link>

    </motion.div>

  </React.Fragment>

}
