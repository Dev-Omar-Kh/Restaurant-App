import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoData } from '../../../Site/Store/InfoSlice';
import { useFormik } from 'formik';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import Status from '../../../Site/Components/Status/Status';

import iCSS from '../../Style/form.module.css';
import localCSS from '../../Style/Local-style.module.css';

export default function Info() {

    // ====== call-data ====== //

    const dispatch = useDispatch();
    const {dataInfo , isLoading} = useSelector((store) => store.info);

    useEffect(() => {

        dispatch(getInfoData());

    } , [dispatch]);

    // ====== update-data ====== //

    const [startUpdate, setStartUpdate] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(null);

    // === update-API === //

    const values = {

        email: dataInfo?.email,
        phoneNumber: dataInfo?.phoneNumber,
        fFrom: dataInfo?.fullTime?.day.split(' - ')[0],
        fTo: dataInfo?.fullTime?.day.split(' - ')[1],
        opTime: dataInfo?.fullTime?.time.split(' to ')[0],
        cloTime: dataInfo?.fullTime?.time.split(' to ')[1],
        pFrom: dataInfo?.partTime?.day.split(' - ')[0],
        pTo: dataInfo?.partTime?.day.split(' - ')[1],
        pOpTime: dataInfo?.partTime?.time.split(' to ')[0],
        pCloTime: dataInfo?.partTime?.time.split(' to ')[1],
        address: dataInfo?.address,

    }

    const updateInfo = async(values) => {

        setUpdateLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        const updatedValues = {

            ...values,

            fullTime: {
                day: `${values.fFrom} - ${values.fTo}`,
                time: `${values.opTime} to ${values.cloTime}`
            },


            partTime: {
                day: `${values.pFrom} - ${values.pTo}`,
                time: `${values.pOpTime} to ${values.pCloTime}`
            }
        };

        const {data} = await axios.put(`https://restaurant-six-snowy.vercel.app/infoRestaurant/${dataInfo._id}` , updatedValues , {
            headers : {token : localStorage.getItem('tkn')}
        })

        if(data.success === true){

            setSuccessMsg('Information updated successfully');
            setStartUpdate(false);

        }
        else{

            setErrMsg(data.message);

        }

        setUpdateLoading(false);

    }

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : updateInfo,

        enableReinitialize: true,

        validate : (values) =>{

            const error = {};

            if(
                values.fFrom.length < 4 || values.fTo.length < 4 || 
                values.opTime.length < 4 || values.cloTime.length < 4
            ){
                error.fullTime = 'Some thing error';
            }

            if(
                values.pFrom.length < 4 || values.pTo.length < 4 || 
                values.pOpTime.length < 4 || values.pCloTime.length < 4
            ){
                error.partTime = 'Some thing error';
            }

            if(!values.email.includes('@') && !values.email.includes('.')){
                error.email = 'The email is invalid';
            }

            if(!values.phoneNumber.match(/^(02)?01[0125][0-9]{8}$/)){
                error.phoneNumber = 'The phone number is invalid';
            }

            if(values.address.length < 4){
                error.address = 'The location is too short'
            }

            if(values.address.length > 49){
                error.address = 'The location is too long'
            }

            return error

        }

    })

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <div className={localCSS.container}>

            <div className={localCSS.title}>
                <i className="icons_active fa-solid fa-hashtag"></i>
                Restaurant Information 
            </div>

            <form 
                onSubmit={formikObj.handleSubmit}
                style={updateLoading ? {opacity : 0.6} : {}}
                className={iCSS.form}
            >

                <div className={iCSS.input_cont}>

                    <div className={iCSS.loader}></div>
                    <label htmlFor="email">
                        <span>Email : </span>
                        {formikObj.errors.email && formikObj.touched.email &&
                            <span className={iCSS.err_msg_label}>* {formikObj.errors.email}</span>
                        }
                    </label>
                    <input
                        id='email'
                        type="text" placeholder={isLoading ? 'Loading...' : 'Restaurant email'} 
                        disabled={!startUpdate}
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.email || ''}
                    />

                </div>

                <div className={iCSS.input_cont}>

                    <div className={iCSS.loader}></div>

                    <label htmlFor="phoneNumber">
                        <span>Phone : </span>
                        {formikObj.errors.phoneNumber && formikObj.touched.phoneNumber &&
                            <span className={iCSS.err_msg_label}>* {formikObj.errors.phoneNumber}</span>
                        }
                    </label>
                    <input
                        id='phoneNumber'
                        type="text" placeholder={isLoading ? 'Loading...' : 'Restaurant phone' }
                        disabled={!startUpdate}
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.phoneNumber || ''}
                    />

                </div>

                <div className={iCSS.times}>

                    <div className={iCSS.times_header}>
                        <h3>Full time job</h3>
                        {formikObj.errors.fullTime &&
                            <span className={iCSS.err_msg_label}>* {formikObj.errors.fullTime}</span>
                        }
                    </div>

                    <div className={iCSS.time_box}>

                        <input
                            disabled={!startUpdate}
                            id='fFrom'
                            type="text" placeholder={isLoading ? 'Loading...' : 'Full time from'}
                            onChange={formikObj.handleChange}
                            value={formikObj.values.fFrom || ''}
                        />

                        <span>-</span>

                        <input
                            disabled={!startUpdate}
                            id='fTo'
                            type="text" placeholder={isLoading ? 'Loading...' : 'Full time to'}
                            onChange={formikObj.handleChange}
                            value={formikObj.values.fTo || ''}
                        />

                    </div>

                    <div className={iCSS.time_box}>

                        <input
                            disabled={!startUpdate}
                            id='opTime'
                            type="text" placeholder={isLoading ? 'Loading...' : 'Time opening'}
                            onChange={formikObj.handleChange}
                            value={formikObj.values.opTime || ''}
                        />

                        <span>to</span>

                        <input
                            disabled={!startUpdate}
                            id='cloTime'
                            type="text" placeholder={isLoading ? 'Loading...' : 'Time closing'}
                            onChange={formikObj.handleChange}
                            value={formikObj.values.cloTime || ''}
                        />

                    </div>

                </div>

                <div className={iCSS.times}>

                    <div className={iCSS.times_header}>
                        <h3>Part time job</h3>
                        {formikObj.errors.partTime &&
                            <span className={iCSS.err_msg_label}>* {formikObj.errors.partTime}</span>
                        }
                    </div>

                    <div className={iCSS.time_box}>

                        <input
                            disabled={!startUpdate}
                            id='pFrom'
                            type="text" placeholder={isLoading ? 'Loading...' : 'Part time from'}
                            onChange={formikObj.handleChange}
                            value={formikObj.values.pFrom || ''}
                        />

                        <span>-</span>

                        <input
                            disabled={!startUpdate}
                            id='pTo'
                            type="text" placeholder={isLoading ? 'Loading...' : 'Part time to'}
                            onChange={formikObj.handleChange}
                            value={formikObj.values.pTo || ''}
                        />

                    </div>

                    <div className={iCSS.time_box}>

                        <input
                            disabled={!startUpdate}
                            id='pOpTime'
                            type="text" placeholder={isLoading ? 'Loading...' : 'Time opening'}
                            onChange={formikObj.handleChange}
                            value={formikObj.values.pOpTime || ''}
                        />

                        <span>to</span>

                        <input
                            disabled={!startUpdate}
                            id='pCloTime'
                            type="text" placeholder={isLoading ? 'Loading...' : 'Time closing'}
                            onChange={formikObj.handleChange}
                            value={formikObj.values.pCloTime || ''}
                        />

                    </div>

                </div>

                <div className={iCSS.input_cont}>

                    <div className={iCSS.loader}></div>

                    <label htmlFor="address">
                        <span>Location : </span>
                        {formikObj.errors.address && formikObj.touched.address &&
                            <span className={iCSS.err_msg_label}>* {formikObj.errors.address}</span>
                        }
                    </label>
                    <input
                        id='address'
                        type="text" placeholder={isLoading ? 'Loading...' : 'Restaurant Location'} 
                        disabled={!startUpdate}
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.address || ''}
                    />

                </div>

                <div className={iCSS.btn_cont}>
                    {!startUpdate && <button onClick={() => setStartUpdate(true)} className={iCSS.submit} type='button'>
                        <i className="fa-regular fa-pen-to-square"></i>
                        Start Update
                    </button>}

                    {startUpdate && <button className={iCSS.submit} type='submit'>
                        {updateLoading ? <ThreeCircles
                            visible={true} height="20" width="20" color="var(--dark-color-1)"
                            ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                        /> : <>
                            <i className="fa-regular fa-pen-to-square"></i>
                            Update
                        </>}
                    </button>}

                    {startUpdate && <button onClick={() => setStartUpdate(false)} className={iCSS.cancel} type='button'>
                        <i className="fa-solid fa-repeat"></i>
                        Cancel
                    </button>}
                </div>

            </form>

        </div>

    </React.Fragment>

}
