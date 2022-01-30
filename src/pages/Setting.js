import React, { useState, useEffect } from 'react'
import './CSS/Setting.css';
import {
    Modal
} from '@mui/material'
import Sidebar from '../components/Sidebar';
import ModalChild from './SettingModal'
import { auth, firestore } from '../components/firebase';
import AddRModal from './AddRoomModal';
import HomeIsoModal from './HomeIsoModal';
function Analytics() {

    const [openModal, setOpenModal] = useState(false);
    const [addRModal, setAddRModal] = useState(false);
    const [homeIsoModal, setHomeIsoModal] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [Iso, setIso] = useState({});
    const [selectedRoom, setSelectedRoom] = useState({});
    useEffect(() => {
        const subscriber = firestore.collection('reserveBed').doc(auth.currentUser.uid).collection('rooms').orderBy('price', 'asc').onSnapshot((snapshot) => {
            let results = [];
            snapshot.forEach((doc) => {
                results.push({ id: doc.id, data: doc.data() })
            })
            setRooms(results)
        })
        const homeSub = firestore.collection('homeIsolate').doc(auth.currentUser.uid).onSnapshot((doc) => {
            setIso(doc.data())
        })
        return () => subscriber();
    }, [])

    return (
        <div>
            <Sidebar />
            {openModal &&
                <Modal
                    className="modal"
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    <ModalChild closeModal={setOpenModal} roomData={selectedRoom} />
                </Modal>
            }
            {addRModal &&
                <Modal
                    className="modal"
                    open={addRModal}
                    onClose={() => setAddRModal(false)}
                >
                    <AddRModal closeModal={setAddRModal} />
                </Modal>
            }
            {homeIsoModal &&
                <Modal
                    className="modal"
                    open={homeIsoModal}
                    onClose={() => homeIsoModal}
                >
                    <HomeIsoModal closeModal={setHomeIsoModal} roomData={Iso} />
                </Modal>
            }
            <div className="bord-setting">
                <div className='SettingText'>การตั้งค่า</div>
                <div className='AddRoomBox' onClick={() => setAddRModal(true)}>
                    <p className='AddRoomText'>+ เพิ่มห้อง</p>
                </div>
                <div className='Body'>
                    <div className='BigBox'>
                        <div className='RoomBox'>
                            <div className='NumberBox' style={{fontFamily: 'Kanit'}}>
                                กักตัว
                            </div>
                            <div className='AmountSection'>
                                <p className='AmountText'>จำนวน</p>
                                <p className='AmountValue'>{Iso.amount}</p>
                            </div>
                            <div className='PriceSection'>
                                <p className='PriceText'>ราคา</p>
                                <p className='PriceValue'>{Iso.price}฿</p>
                            </div>
                            <div className='EditButton'>
                                <button className='EditRoomButton' onClick={() => {
                                    setHomeIsoModal(true)
                                }}>Edit</button>
                            </div>
                        </div>
                    </div>
                    {rooms.map((item, index) => {
                        return (
                            <div key={index} className='BigBox'>
                                <div className='RoomBox'>
                                    <div className='NumberBox'>
                                        {index + 1}
                                    </div>
                                    <div className='NameSection'>
                                        <p className='NameText'>ชื่อ</p>
                                        <p className='NameValue'>{item.data.room_title}</p>
                                    </div>
                                    <div className='AmountSection'>
                                        <p className='AmountText'>จำนวน</p>
                                        <p className='AmountValue'>{item.data.room_amount}</p>
                                    </div>
                                    <div className='PriceSection'>
                                        <p className='PriceText'>ราคา</p>
                                        <p className='PriceValue'>{item.data.price}฿</p>
                                    </div>
                                    <div className='EditButton'>
                                        <button className='EditRoomButton' onClick={() => {
                                            setSelectedRoom(item)
                                            setOpenModal(true)
                                        }}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Analytics