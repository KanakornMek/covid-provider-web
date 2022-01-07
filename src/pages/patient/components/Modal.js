import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Fab, Box, Avatar } from '@mui/material';
import './Modal.css'
import { color } from '@mui/system';
import { red } from '@mui/material/colors';
import { Carousel } from 'react-responsive-carousel';


function MyModal({ open, setOpen, data }) {

    return (
        <>
            <Modal
                className='modal'
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className='modal-box' >
                    <div className='header' >
                        <div className='box' >
                            <p1 className="title"> Patient - {data.name} </p1>
                            <button className='exit-button' onClick={() => setOpen(false)} >x</button>
                        </div>
                    </div>
                    <div className='info-container'>
                        <div className='wrapper-details'>
                            <div>
                                <div className='titlebox1'>
                                    <Avatar src={data.picture} />
                                    <p style={{ marginLeft: 10, marginTop: 10 }}>Name : {data.name}</p>
                                </div>
                                <div className='titlebox2'>
                                    <h1 >Age : 16</h1>
                                    <h1 >Sex : Female</h1>
                                    <h1 >ID no : 1200000000000</h1>
                                    <h1 >Tel : 0xx-xxx-xxxx</h1>
                                    <h1 >room : {data.Type}</h1>
                                    <h1 >Bed no : {data.Bed}</h1>
                                    <h1 >Call Time: 16:00-16:10</h1>
                                    <h1 >Doctor: Dr.Mingmonkey</h1>
                                    <h1 >Day in: 10 Apr 64</h1>
                                    <h1 >Day out: 24 Apr 64</h1>
                                </div>

                            </div>
                            <Carousel showArrows={true} width={200} emulateTouch dynamicHeight swipeable >
                                <div>
                                    <div style={{ width: 200, height: 250, backgroundColor: 'red' }}></div>
                                </div>
                                <div>
                                    <div style={{ width: 200, height: 250, backgroundColor: 'green' }}></div>
                                </div>
                                <div>
                                    <div style={{ width: 200, height: 250, backgroundColor: 'blue' }}></div>
                                </div>
                                <div>
                                    <div style={{ width: 200, height: 250, backgroundColor: 'red' }}></div>
                                </div>
                                <div>
                                    <div style={{ width: 200, height: 250, backgroundColor: 'red' }}></div>
                                </div>
                                <div>
                                    <div style={{ width: 200, height: 250, backgroundColor: 'red' }}></div>
                                </div>
                            </Carousel>
                        </div>


                        <div className='bottombutton'>

                            <Button variant='outlined'
                                sx={{
                                    borderColor: 'red',
                                    '&:hover': {
                                        backgroundColor: 'red',
                                        color: 'white'
                                    }, color: 'red', 
                                }} >Edit</Button>

                            <Button variant='contained'
                                sx={{
                                    backgroundColor: '#00f74a', 
                                    '&:hover': {
                                        backgroundColor: '#00a130',
                                        
                                    }
                                    , marginLeft: 1.5, 
                                }}
                            >Save</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}



export default MyModal;