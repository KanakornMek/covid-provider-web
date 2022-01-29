import {
    Button,
    Modal,
    Fab,
    Box,
    Avatar,
    Backdrop,
    TextField,
    CircularProgress
} from '@mui/material';
import {
    ZoomIn,
    ZoomOut,
    ZoomOutMap
} from '@mui/icons-material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { styled } from '@mui/material/styles'
import {
    Close
} from '@mui/icons-material'
import './RequestModal.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/compat';
import { auth, functions, storage } from '../../../components/firebase';

function PreviewImgModal({ imgURL, open, setOpen }) {
    const zoom = [1, 1.25, 1.5, 2, 2.5];
    const [disableIn, setdisableIn] = useState(false);
    const [disableOut, setdisableOut] = useState(false);
    const [zoomStep, setZoomStep] = useState(0);
    const [currZoom, setCurrZoom] = useState(1);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (zoomStep === 4) {
            setdisableIn(true);
        } else if (zoomStep === 0) {
            setdisableOut(true);
        } else if (zoomStep > 4) {
            setZoomStep(4);
        } else if (zoomStep < 1) {
            setZoomStep(0);
        }
        setCurrZoom(zoom[zoomStep]);

    }, [zoomStep])

    return (
        <Modal
            className="img-preview-modal"
            BackdropComponent={styled(Backdrop, {
                name: 'MuiModal',
                slot: 'Backdrop',
                overridesResolver: (props, styles) => {
                    return styles.backdrop;
                },
            })({
                zIndex: -1,
                backgroundColor: 'rgba(14,14,14,0.8)'
            })}
            open={open}
            onClose={handleClose}
        >
            <>
                <div className='img-modal-box'>
                    <img
                        src={imgURL}
                        className='preview-img'
                        style={{ transform: `scale(${currZoom})`, transition: 'transform 0.5s ease' }}
                    />
                </div>
                <div className='zoom-tools'  >
                    <div onClick={() => {
                        setZoomStep(zoomStep - 1);
                    }}>
                        <ZoomOut sx={{ color: 'white' }} />
                    </div>
                    <div>
                        <ZoomOutMap sx={{ color: 'white' }} />
                    </div>
                    <div onClick={() => {
                        setZoomStep(zoomStep + 1);
                    }}>
                        <ZoomIn sx={{ color: 'white' }} />
                    </div>
                </div>
            </>


        </Modal>
    );
}

function RequestModal({ open, setOpen, reqData, selected }) {
    const hospitalId = auth.currentUser.uid;
    const [previewModal, setpreviewModal] = useState(false);
    const [selectedImg, setSelectedImg] = useState('');
    const [FacewithID, setFacewithID] = useState('');
    const [IdImg, setIdImg] = useState('');
    const [covidTest, setCovidTest] = useState('');
    const [range, setRange] = useState([null, null])
    const [bedId, setBedId] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        storage.ref(`${selected === 1 ? 'reserveBed' : 'homeIsolate'}/${hospitalId}/patients/${reqData.data.userId}/FacewithID`).getDownloadURL().then((url) => {
            setFacewithID(url);
        }).catch((error) => {
            switch (error.code) {
                case 'storage/object-not-found':
                    alert('object not found')
                    break;
                case 'storage/unauthorized':
                    alert('user unauthorized')
                    break;
            }
        });
        storage.ref(`${selected === 1 ? 'reserveBed' : 'homeIsolate'}/${hospitalId}/patients/${reqData.data.userId}/IdImg`).getDownloadURL().then((url) => {
            setIdImg(url)
        }).catch((error) => {
            switch (error.code) {
                case 'storage/object-not-found':
                    alert('object not found')
                    break;
                case 'storage/unauthorized':
                    alert('user unauthorized')
                    break;
            }
        });
        storage.ref(`${selected === 1 ? 'reserveBed' : 'homeIsolate'}/${hospitalId}/patients/${reqData.data.userId}/covidTest`).getDownloadURL().then((url) => {
            setCovidTest(url)
        }).catch((error) => {
            switch (error.code) {
                case 'storage/object-not-found':
                    alert('object not found')
                    break;
                case 'storage/unauthorized':
                    alert('user unauthorized')
                    break;
            }
        });
    }, [selected])

    function calcAge(bdate) {
        var birth = new Date(bdate);
        var check = new Date();
        var milliDay = 1000 * 60 * 60 * 24; // a day in milliseconds;
        var ageInDays = (check - birth) / milliDay;
        var ageInYears = Math.floor(ageInDays / 365);
        return birth.toLocaleDateString('th-TH') + ` (${ageInYears} ปี)`;
    }
    return (
        <>
            <Modal
                className='modal'
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className='modal-box' >
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress />
                    </Backdrop>
                    <div className='container'>
                        <PreviewImgModal open={previewModal} setOpen={setpreviewModal} imgURL={selectedImg} />
                        <div className='header' >
                            <div className='box' >
                                <p className="title"> Patient - {reqData.data.firstname} </p>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setOpen(false)}>
                                    <Close />
                                </div>
                            </div>
                        </div>
                        <div className='info-container'>
                            <div className='wrapper-details'>
                                <div>
                                    <div className='titlebox1'>
                                        <Avatar src='' />
                                        <p style={{ marginLeft: 10, marginTop: 10 }}>Name : {(reqData.data.firstname + ' ' + reqData.data.lastname)}</p>
                                    </div>
                                    <div className='titlebox2'>
                                        <p className='patient-details'>วันเกิด: {calcAge(reqData.data.birthDate)}</p>
                                        <p className='patient-details' >เพศ: {reqData.data.gender === 'female' ? 'หญิง' : 'ชาย'}</p>
                                        <p className='patient-details'>เลขบัตรปชช.: {reqData.data.id_no}</p>
                                        <p className='patient-details'>เบอร์โทรศัพท์: {reqData.data.phoneNumber}</p>
                                    </div>
                                    <div style={{ margin: '10px 0px'}}>
                                        {selected===1 && 
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <TextField label='เลขที่ห้อง' size='small' onChange={(e) => {
                                                    setBedId(e.target.value)
                                                    console.log(bedId);
                                                }} />
                                            </div> 
                                        }
                                        
                                        <div style={{margin: '5px 0px'}}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateRangePicker
                                                    startText="Check-in"
                                                    endText="Check-out"
                                                    value={range}
                                                    onChange={(newValue) => {
                                                        setRange(newValue);
                                                        console.log(range)
                                                    }}
                                                    renderInput={(startProps, endProps) => (
                                                        <React.Fragment>
                                                            <TextField sx={{ width: 100 }} {...startProps} />
                                                            <Box sx={{ mx: 2 }}> to </Box>
                                                            <TextField sx={{ width: 100 }} {...endProps} />
                                                        </React.Fragment>
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </div>

                                    </div>

                                </div>
                                <div style={{ margin: 10, }}>

                                    <Carousel
                                        showArrows={true}
                                        width={200}
                                        emulateTouch
                                        dynamicHeight
                                        swipeable
                                        showThumbs={false} >

                                        <div className='carousel-div' onClick={() => {
                                            setSelectedImg(FacewithID);
                                            setpreviewModal(true);
                                        }}>
                                            <img src={FacewithID} />
                                            <p className='img-legend'>บัตรปชช. กับหน้า</p>
                                        </div>
                                        <div className='carousel-div'>
                                            <img src={IdImg} />
                                            <p className='img-legend' >บัตรปชช.</p>
                                        </div>
                                        <div className='carousel-div'>
                                            <img src={covidTest} />
                                            <p className='img-legend' >ผลตรวจ</p>
                                        </div>

                                    </Carousel>
                                </div>
                            </div>


                            <div className='bottombutton'>

                                <Button variant='outlined'
                                    sx={{
                                        borderColor: '#ee3827',
                                        color: '#ee3827',
                                        '&:hover': {
                                            backgroundColor: '#ee3827',
                                            borderColor: '#ee3827',
                                            color: 'white'
                                        }
                                    }}
                                    onClick={() => {
                                        if (selected === 1) {
                                            setLoading(true);
                                            let reject = functions.httpsCallable('rejectBedRequest')
                                            reject({
                                                requestId: reqData.id
                                            }).then((result) => {
                                                console.log(result.data.status);
                                                setOpen(false)
                                            })
                                        } else {
                                            setLoading(true);
                                            let reject = functions.httpsCallable('rejectHomeRequest')
                                            reject({
                                                requestId: reqData.id
                                            }).then((result) => {
                                                console.log(result.data.status);
                                                setOpen(false)
                                            })
                                        }

                                    }} >Decline</Button>

                                <Button variant='contained'
                                    sx={{
                                        backgroundColor: '#059862', '&:hover': {
                                            backgroundColor: '#036541'
                                        }
                                        , marginLeft: 1.5
                                    }}
                                    onClick={() => {
                                        console.log(range)
                                        if(selected === 1 && range[0] !== null && range[1] !== null && bedId !==''){
                                            setLoading(true);
                                            let accept = functions.httpsCallable('acceptBedRequest')
                                            accept({ bedId: bedId, admitDate: range[0], releaseDate: range[1], requestId: reqData.id }).then((result) => {
                                                setLoading(false);
                                                setOpen(false);
                                                console.log(result.data.status);
                                            })
                                        } else if(selected === 2 && range[0] !== null && range[1] !== null) {
                                            setLoading(true);
                                            let accept = functions.httpsCallable('acceptHomeRequest')
                                            accept({admitDate: range[0], releaseDate: range[1], requestId: reqData.id }).then((result) => {
                                                setLoading(false);
                                                setOpen(false);
                                                console.log(result.data.status);
                                            })
                                        } else{
                                            alert('กรุณาพิมพ์รายละเอียด')
                                        }
                                    }}
                                >Accept</Button>
                            </div>

                        </div>
                    </div>


                </div>
            </Modal>

        </>
    );
}



export default RequestModal;