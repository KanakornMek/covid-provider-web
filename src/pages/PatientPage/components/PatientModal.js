import {
    Button,
    Modal,
    Fab,
    Box,
    Avatar,
    Backdrop,
    TextField,
    CircularProgress,
    Checkbox,
    FormControlLabel
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
import './PatientModal.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/compat';
import { auth, firestore, functions, storage } from '../../../components/firebase';

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

function PatientModal({ open, setOpen, patientData, selected }) {
    const hospitalId = auth.currentUser.uid;
    const service = (selected === 1) ? 'reserveBed' : 'homeIsolate';
    const [previewModal, setpreviewModal] = useState(false);
    const [selectedImg, setSelectedImg] = useState('');
    const [FacewithID, setFacewithID] = useState('');
    const [IdImg, setIdImg] = useState('');
    const [covidTest, setCovidTest] = useState('');
    const [range, setRange] = useState([tStampToDate(patientData.data.admitDate.seconds), tStampToDate(patientData.data.releaseDate.seconds)])
    const [bedId, setBedId] = useState(patientData.data.bedId);
    const [isArrived, setIsArrived] = useState(selected === 1 ? patientData.data.arrived : false);
    const [loading, setLoading] = useState(false);
    const [addressModal, setAddressModal] = useState(false);
    useEffect(() => {
        storage.ref(`${service}/${hospitalId}/patients/${patientData.data.userId}/FacewithID`).getDownloadURL().then((url) => {
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
        storage.ref(`${service}/${hospitalId}/patients/${patientData.data.userId}/IdImg`).getDownloadURL().then((url) => {
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
        storage.ref(`${service}/${hospitalId}/patients/${patientData.data.userId}/covidTest`).getDownloadURL().then((url) => {
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
    useEffect(() => {
        console.log(typeof(isArrived), isArrived)
    },[isArrived])
    function tStampToDate(timestamp) {
        return new Date(timestamp * 1000)
    }
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
                                <p className="title"> Patient - {patientData.data.firstname} </p>
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
                                        <p style={{ marginLeft: 10, marginTop: 10 }}>Name : {(patientData.data.firstname + ' ' + patientData.data.lastname)}</p>
                                    </div>
                                    <div className='titlebox2'>
                                        <p className='patient-details'>วันเกิด: {calcAge(patientData.data.birthDate)}</p>
                                        <p className='patient-details'>เพศ: {patientData.data.gender === 'female' ? 'หญิง' : 'ชาย'}</p>
                                        <p className='patient-details'>เลขบัตรปชช.: {patientData.data.id_no}</p>
                                        <p className='patient-details'>เบอร์โทรศัพท์: {patientData.data.phoneNumber}</p>
                                    </div>
                                    {selected ===2 && 
                                        <Modal
                                            className="modal"
                                            open={addressModal}
                                            onClose={() => setAddressModal(false)}
                                        >
                                            <div className='address-container'>
                                                <h2>ที่อยู่</h2>
                                                <p>{patientData.data.address}</p>
                                                <p>แขวง/ตำบล: {patientData.data.tumbon}</p>
                                                <p>เขต/อำเภอ: {patientData.data.district}</p>
                                                <p>จังหวัด: {patientData.data.province}</p>
                                                <p>รหัสไปรษณีย์: {patientData.data.postalCode}</p>
                                            </div>
                                        </Modal>
                                    }
                                    <div style={{ margin: '10px 0px' }}>
                                        {selected === 1 &&
                                            <div style={{ display: 'flex',gap:5 }}>
                                                <TextField label='เลขที่ห้อง' size='small' sx={{width: 100}}
                                                    value={bedId}
                                                    onChange={(e) => {
                                                        setBedId(e.target.value)
                                                        console.log(bedId);
                                                    }}
                                                />
                                                <FormControlLabel control={
                                                    <Checkbox value={isArrived} onChange={(e) => {
                                                        setIsArrived(e.target.checked);
                                                    }} />} label="เข้ารับบริการแล้ว" />
                                            </div>
                                        }
                                        <div style={{margin: '10px 0px'}}>
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
                                        backgroundColor: '#cccccc',
                                        color: 'black',
                                        borderColor: '#919191',
                                        '&:hover': {
                                            backgroundColor: '#cccccc',
                                            borderColor: '#919191',
                                        }
                                    }}
                                    onClick={() => {
                                        setOpen(false)
                                    }}
                                >
                                    ยกเลิก
                                </Button>
                                <Button variant='contained'
                                    sx={{
                                        backgroundColor: '#ee3827', '&:hover': {
                                            backgroundColor: '#ee3827'
                                        }
                                        , marginLeft: 1.5
                                    }}
                                    onClick={() => {
                                        let release = (selected === 1) ? functions.httpsCallable('releaseBedPatient') : functions.httpsCallable('releaseHomePatient');
                                        release({ patientId: patientData.id }).then((res) => {
                                            console.log(res.data.status);
                                        })
                                    }}
                                >นำผู้ป่วยออกจากให้บริการ</Button>
                                <Button variant='contained'
                                    sx={{
                                        backgroundColor: '#059862', '&:hover': {
                                            backgroundColor: '#036541'
                                        }
                                        , marginLeft: 1.5
                                    }}
                                    onClick={() => {
                                        if (selected === 1) {
                                            firestore.collection('reserveBed').doc(auth.currentUser.uid).collection('patients').doc(patientData.id).update({
                                                bedId: bedId,
                                                admitDate: firebase.firestore.Timestamp.fromDate(range[0]),
                                                releaseDate: firebase.firestore.Timestamp.fromDate(range[1]),
                                                arrived: isArrived
                                            })
                                        } else {
                                            firestore.collection('homeIsolate').doc(auth.currentUser.uid).collection('patinets').doc(patientData.id).update({
                                                admitDate: firebase.firestore.Timestamp.fromDate(range[0]),
                                                releaseDate: firebase.firestore.Timestamp.fromDate(range[1])
                                            })
                                        }
                                    }}
                                >บันทึก</Button>
                            </div>

                        </div>
                    </div>


                </div>
            </Modal>

        </>
    );
}



export default PatientModal;