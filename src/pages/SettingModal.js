import React from 'react';
import './CSS/SettingModal.css';

export default function Modal({closeModal}) {
  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='modalHeader'>
                <div className='modalHeaderText'> 1 - Exclusive</div>
            </div>
            <div className='modalBody'>
                <form>
                    <div className='FormRoomNameSection'>
                        <input type="text" autoComplete="off" name="from_name" placeholder="Name" required></input>
                    </div>
                    <div className='FormRoomAmountSection'>
                        <input type="number" autoComplete="off" name="from_name" placeholder="Amount of the room" required></input>
                    </div>
                    <div className='FormRoomPriceSection'>
                        <input type="number" autoComplete="off" name="from_name" placeholder="Price of the room" required></input>
                    </div>
                </form>
            </div>
            <div className='modalBottomrlt'>
                <div className='modalBottom'>
                    <button className='cancleButt' onClick={() => closeModal(false)}>Cancle</button>
                    <button className='removeButt'>Remove</button>
                    <button className='saveButt'>Save</button>
                </div>
            </div>
        </div>
    </div>
  );
}
