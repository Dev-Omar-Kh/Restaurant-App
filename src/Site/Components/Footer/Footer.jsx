import React from 'react';

import fCSS from './footer.module.css';

export default function Footer() {

    return <React.Fragment>

        <div className={fCSS.container}>

            <div className={fCSS.subscribe}>

                <div className={fCSS.subscribe_det}>

                    <h3>Subscribe to our newsletter</h3>

                    <p className={fCSS.title_p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                    <div className={fCSS.open}>

                        <h5>Opening Hours</h5>

                        <div className={fCSS.time}>

                            <div>

                                <p>Monday - Friday</p>
                                <p>8:00am to 9:00pm</p>

                            </div>

                            <div>

                                <p>Monday - Friday</p>
                                <p>8:00am to 9:00pm</p>

                            </div>

                        </div>

                    </div>

                </div>

                <form className={fCSS.send_email}>

                    <div className={fCSS.form_cont}>

                        <input type="text" placeholder='Enter your email'/>
                        <button type='submit'>Subscribe</button>

                    </div>

                    <p>By subscribing you agree to with our Privacy Policy</p>

                </form>

            </div>

            <div className={fCSS.important_links}>

                

            </div>

        </div>

    </React.Fragment>

}
