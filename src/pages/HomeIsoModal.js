import { Button } from '@mui/material';
import React, { useState } from 'react';
import { auth, firestore } from '../components/firebase';
import './CSS/SettingModal.css';

export default function HomeIsoModal({closeModal,roomData}) {
    const [roomAmount, setRoomAmount] = useState(roomData.amount.toString());
    const [price, setPrice] = useState(roomData.price.toString());
  return (
        <div className='modalContainer'>
            <div className='modalHeader'>
                <div className='modalHeaderText'>บริการกักตัวที่บ้าน</div>
            </div>
            <div className='modalBody'>
                <form>
                    <div className='FormSection'>
                        <p className='input_title'>จำนวนห้อง</p>
                        <input type="number" autoComplete="off" name="from_name" value={roomAmount} placeholder="จำนวนห้อง" required
                            onChange={(e) => setRoomAmount(e.target.value)}
                        ></input>
                    </div>
                    <div className='FormSection'>
                        <p className='input_title'>ราคา</p>
                        <input type="number" autoComplete="off" name="from_name" value={price} placeholder="ราคา" required
                            onChange={(e) => setPrice(e.target.value)}
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
                            firestore.collection('homeIsolate').doc(auth.currentUser.uid).update({
                                amount: IntRoomAmount,
                                price: IntPrice
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