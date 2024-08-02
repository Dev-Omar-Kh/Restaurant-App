import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@lordicon/react';

import sCSS from './status.module.css';

const congIcon = require('../../Images/JSON/wired-flat-1103-confetti.json');
// const wrongIcon = require('../../Images/JSON/wrong.json');

export default function Status() {

    const playerRef = useRef(null);
    const [contWidth, setContWidth] = useState(0);

    useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, []);

    useEffect(() => {

        const container = document.getElementById('container');
        setContWidth(container.offsetWidth);

    } , [])

    return <React.Fragment>

        <div id='container' className={sCSS.container}>

            <div className={sCSS.status_box}>

                <p>Registration successful. Go to gmail to verify your email</p>

                <Player 
                    size={contWidth > 769 ? 120 : 80} ref={playerRef} onComplete={() => playerRef.current?.playFromBeginning()} 
                    trigger="hover" icon={congIcon} 
                />

            </div>

        </div>

    </React.Fragment>

}
