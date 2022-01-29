import React, { useState } from 'react'
import './CSS/Setting.css'
import Sidebar from '../components/Sidebar';
import Modal from './SettingModal'

function Analytics() {

const [openModal, setOpenModal] = useState(false);

const arr = [{number:1,name:'Exclusive',amount:5,price:500},{number:2,name:'Super Exclusive',amount:5,price:500},
{number:3,name:'Exclusive',amount:5,price:500},
{number:4,name:'Exclusive',amount:5,price:500},
{number:5,name:'Exclusive',amount:5,price:500},]

    return (
        <div>
            <Sidebar />
            {openModal && <Modal closeModal={setOpenModal} />}
            <div class="bord-setting">
                <div className='SettingText'>Room Setting</div>
                <div className='AddRoomBox'>
                        <a href='https://www.youtube.com/watch?v=n0j5NPptyM0&ab_channel=Kep1er' className='AddRoomText'>+ Add Room</a>
                </div>
                <div className='Body'>
                    { arr.map((item, index) => {
                        return(
                            <div key={index} className='BigBox'>
                                <div className='RoomBox'>
                                    <div className='NumberBox'>
                                        {item.number}
                                    </div>
                                        <div className='NameSection'>
                                            <p className='NameText'>Name</p>
                                            <p className='NameValue'>{item.name}</p>
                                        </div>
                                        <div className='AmountSection'>
                                            <p className='AmountText'>Amount</p>
                                            <p className='AmountValue'>{item.amount}</p>
                                        </div>
                                        <div className='PriceSection'>
                                            <p className='PriceText'>Price</p>
                                            <p className='PriceValue'>{item.price}฿</p>
                                        </div>
                                        <div className='EditButton'>
                                            <button className='EditRoomButton' onClick={() => {setOpenModal(true)}}>Edit</button>
                                        </div>
                                </div>
                            </div>
                        )
                    }) }
                </div>
            </div>
        </div>
    )
}

export default Analytics