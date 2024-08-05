import React from 'react';

import pcCSS from './pro-card.module.css';

export default function ProCard() {
  return (
    <div className={pcCSS.card}>

        <img src={require('../../../Images/auth_bg.jpg')} alt="" />

        <h3>Fruit Salad</h3>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>

        <span>128 EGP</span>

    </div>
  )
}
