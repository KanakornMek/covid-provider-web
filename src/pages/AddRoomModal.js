import { Button } from '@mui/material';
import React, { useState } from 'react';
import { auth, firestore, storage } from '../components/firebase';
import './CSS/AddRoomModal.css';

export default function AddRModal({closeModal}) {
    const [roomName, setRoomName] = useState('');
    const [roomAmount, setRoomAmount] = useState('');
    const [price, setPrice] = useState('');
    const [roomPic, setRoomPic] = useState('');
  return (
        <div className='modalContainer'>
            <div className='modalHeader'>
                <div className='modalHeaderText'>เพิ่มห้อง</div>
            </div>
            <div className='modalBody'>
                <form>
                    <div className='FormSection'>
                        <p className='input_title'>ชื่อห้อง</p>
                        <input type="text" autoComplete="off" name="from_name" value={roomName} placeholder="ชื่อ"
                            onChange={(e) => setRoomName(e.target.value)}
                        ></input>
                    </div>
                    <div className='FormSection'>
                        <p className='input_title'>จำนวนห้อง</p>
                        <input type="number" autoComplete="off" name="from_name" value={roomAmount} placeholder="จำนวนห้อง" 
                            onChange={(e) => setRoomAmount(e.target.value)}
                        ></input>
                    </div>
                    <div className='FormSection'>
                        <p className='input_title'>ราคา</p>
                        <input type="number" autoComplete="off" name="from_name" value={price} placeholder="ราคา" 
                            onChange={(e) => setPrice(e.target.value)}
                        ></input>
                    </div>
                    <div className='FormSection'>
                        <p className='input_title'>รูปภาพ</p>
                        <input type="file"  name="from_name" 
                            onChange={(e) => setRoomPic(e.target.files[0])}
                        ></input>
                    </div>
                </form>
            </div>
            <div className='modalBottomrlt'>
                <div className='modalBottom'>
                    <Button variant="contained" 
                        sx={{
                            backgroundColor: '#e9e9ed',
                            color: 'black',
                            '&:hover' : {
                                backgroundColor: '#d0d0d7',
                            }
                        }} 
                        onClick={() => closeModal(false)}
                    >
                        ยกเลิก
                    </Button>
                    <Button variant='contained' sx={{
                        backgroundColor: '#059862',
                        color: 'white',
                        '&:hover' : {
                            backgroundColor: '#036541',
                        }
                    }}
                        onClick={() => {
                            let IntRoomAmount = parseInt(roomAmount);
                            let IntPrice = parseInt(price)
                            firestore.collection('reserveBed').doc(auth.currentUser.uid).collection('rooms').add({
                                patient_amount: 0,
                                price: IntPrice,
                                room_amount: IntRoomAmount,
                                room_title: roomName,
                                today_in: 0,
                                today_out: 0
                            }).then((docRef) => {
                                let roomRef = storage.ref(`reserveBed/${auth.currentUser.uid}/rooms/${docRef.id}/roomPic`);
                                roomRef.put(roomPic).then(() => {
                                    firestore.collection('reserveBed').doc(auth.currentUser.uid).collection('rooms').doc(docRef.id).update({
                                        img_url: `https://firebasestorage.googleapis.com/v0/b/nsc-covidapp.appspot.com/o/reserveBed%2F${auth.currentUser.uid}%2Frooms%2F${docRef.id}%2FroomPic?alt=media`
                                    })
                                })
                            })
                        }}
                    >
                        บันทึก
                    </Button>
                </div>
            </div>
        </div>
  );
}