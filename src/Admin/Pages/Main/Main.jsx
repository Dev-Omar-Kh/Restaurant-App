import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getMainData } from '../../../Site/Store/MainSlice';

import mCSS from '../../Style/form.module.css';
import localCSS from '../../Style/Local-style.module.css';
import { ThreeCircles } from 'react-loader-spinner';
import { useFormik } from 'formik';
import axios from 'axios';
import Status from '../../../Site/Components/Status/Status';

export default function Main() {

    // ====== get-main-data ====== //

    const {mainData , mainLoading} = useSelector(store => store.main);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getMainData());

    } ,[dispatch]);

    // ====== update-main-data ====== //

    const [startUpdate, setStartUpdate] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [visible, setVisible] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errMsg, setErrMsg] = useState(null);

    const values = {

        title : mainData?.title,
        description : mainData?.description,
        image : mainData?.image.url

    }

    const updateMain = async(values) => {

        setUpdateLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('image', values.image);

        try {

            const {data} = await axios.put(`https://restaurant-six-snowy.vercel.app/main/${mainData._id}` , formData , {
                headers : {token : localStorage.getItem('tkn')}
            });

            if(data.success){

                setSuccessMsg('Main section Updated successfully !');
                setStartUpdate(false);

            }

            if(data.message !== 'true'){

                setErrMsg(data.message);

            }

        } catch (error) {

            setErrMsg(error);

        }

        setUpdateLoading(false);

    }

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : updateMain,

        validate : (values) => {

            const errors = {};

            if(values.title.length < 5){
                errors.title = 'The title is too short'
            }

            if(values.title.length > 60){
                errors.title = 'The title is too long'
            }

            if(values.description.length < 5){
                errors.description = 'The description is too short'
            }

            if(values.description.length > 60){
                errors.description = 'The description is too long'
            }

            return errors;

        },

        enableReinitialize: true,

    })

    // ====== change-image-view ====== //

    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {

        if (!mainLoading) {

            setImageSrc(formikObj.values.image);

        }

    }, [mainLoading , formikObj.values.image]);

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        formikObj.setFieldValue('image', file);

        if (file) {

            const imageView = new FileReader();
            imageView.readAsDataURL(file);
            imageView.onload = () => {
                setImageSrc(imageView.result);
            }

        }

    };


    return<React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <div className={localCSS.container}>

            <div className={localCSS.title}>
                <i className="icons_active fa-regular fa-images"></i>
                Restaurant Main
            </div>

            <form
                onSubmit={formikObj.handleSubmit}
                style={updateLoading ? {opacity : 0.6} : {}}
                className={mCSS.form}
            >

                <div className={mCSS.input_cont}>

                    <div className={mCSS.loader}></div>
                    <label htmlFor="description">
                        <span>Title : </span>
                        {formikObj.errors.title && formikObj.touched.title && 
                            <span className={mCSS.err_msg_label}>* {formikObj.errors.title}</span>
                        }
                    </label>
                    <input
                        id='title'
                        type="text" placeholder={mainLoading ? 'loading...' : "Enter the Main section's title"}
                        disabled={!startUpdate}
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.title || ''}
                    />

                </div>

                <div className={mCSS.input_cont}>

                    <div className={mCSS.loader}></div>
                    <label htmlFor="description">
                        <span>Description : </span>
                        {formikObj.errors.description && formikObj.touched.description && 
                            <span className={mCSS.err_msg_label}>* {formikObj.errors.description}</span>
                        }
                    </label>
                    <input
                        id='description'
                        type="text" placeholder={mainLoading ? 'loading...' : "Enter the Main section's description"}
                        disabled={!startUpdate}
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.description || ''}
                    />

                </div>

                <div className={mCSS.input_img_cont}>

                    <div className={mCSS.img_view}>

                        {mainLoading ? <ThreeCircles
                            visible={true} height="50" width="50" color="var(--dark-color-2)"
                            ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                        /> : <img src={imageSrc} alt='main_image' />}

                    </div>

                    <div className={mCSS.input_img}>

                        <label style={startUpdate ? {cursor : 'pointer'} : {cursor : 'default'}} htmlFor="inputImg">

                            <input  
                                disabled={!startUpdate}
                                id='inputImg' type="file" 
                                onChange={handleImageChange} 
                            />

                            <svg 
                                width="70" height="70"  viewBox="0 0 24 24" 
                                fill="var(--dark-color-2)" xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <path 
                                    fillRule="evenodd" 
                                    clipRule="evenodd" 
                                    d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" 
                                    fill=""
                                    ></path> 
                                </g>
                            </svg>

                            <p>Upload new image</p>

                        </label>

                    </div>

                </div>

                <div className={mCSS.btn_cont}>

                    {!startUpdate && <button onClick={() => setStartUpdate(true)} className={mCSS.submit} type='button'>
                        <i className="fa-regular fa-pen-to-square"></i>
                        Start Update
                    </button>}

                    {startUpdate && <button className={mCSS.submit} type='submit'>
                        {updateLoading ? <ThreeCircles
                            visible={true} height="20" width="20" color="var(--dark-color-1)"
                            ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                        /> : <>
                            <i className="fa-regular fa-pen-to-square"></i>
                            Update
                        </>}
                    </button>}

                    {startUpdate && <button onClick={() => setStartUpdate(false)} className={mCSS.cancel} type='button'>
                        <i className="fa-solid fa-repeat"></i>
                        Cancel
                    </button>}

                </div>

            </form>

        </div>

    </React.Fragment>

}
