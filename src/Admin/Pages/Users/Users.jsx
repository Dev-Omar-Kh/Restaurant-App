import React, { useState } from 'react';

import uCSS from './users.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import BanMsg from './Ban Msg/BanMsg';
import Status from '../../../Site/Components/Status/Status';

export default function Users() {

    // ====== get-users-from-api ====== //

    const fetchAllUsers =  async() => {

        return await axios.get('https://restaurant-six-snowy.vercel.app/auth' , {
            headers : {token : localStorage.getItem('tkn')}
        })

    }

    const {data, isLoading , refetch} = useQuery('getAllUsers' , fetchAllUsers);


    // ====== handel-ban-users ====== //

    const [banMsg, setBanMsg] = useState(false);
    const [userData, setUserData] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);

    const handelBan = (data) => {

        setSuccessMsg(null);
        setErrMsg(null);
        setBanMsg(true);
        setUserData(data);

    }

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}
        <BanMsg 
            setErrMsg={setErrMsg} setSuccessMsg={setSuccessMsg} 
            rerender={refetch} userData={userData} ban={banMsg} 
            setBan={setBanMsg} 
        />

        <div className={uCSS.container}>

            <div className={uCSS.title}>
                <i className="icons_active fa-solid fa-users-viewfinder"></i>
                Restaurant Users 
            </div>

            <div className={uCSS.scroll_cont}>

                <table className={uCSS.table}>

                    <thead>

                        <tr>

                            <th>id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {isLoading ? <tr className={uCSS.tr_body}>

                                <td>1</td>
                                <td>
                                    <div className={uCSS.loading_center}>
                                        <span></span>
                                    </div>
                                </td>
                                <td>
                                    <div className={uCSS.loading_center}>
                                        <span></span>
                                    </div>
                                </td>
                                <td>
                                    <div className={uCSS.loading_center}>
                                        <span></span>
                                    </div>
                                </td>
                                <td>
                                    <button>
                                        <ThreeCircles
                                            visible={true}
                                            height="15"
                                            width="15"
                                            color="#E63946"
                                            ariaLabel="three-circles-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />
                                    </button>
                                </td>

                            </tr> : <>{

                            data.data.result.map((user , id) => <tr key={user._id} className={uCSS.tr_body}>

                                <td>{id + 1}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><button onClick={() => handelBan(user)}><i className="fa-solid fa-ban"></i> Ban</button></td>

                            </tr>)

                        }</>}

                    </tbody>

                </table>

            </div>

        </div>

    </React.Fragment>

}
