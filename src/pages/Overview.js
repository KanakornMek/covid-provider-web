import React, { useState, useEffect } from 'react'
import './CSS/Overview.css'
import Sidebar from '../components/Sidebar';
import { OverviewChart } from '../components/OverviewChart';
import {auth, firestore} from '../components/firebase'
import {
    KingBed,
    PersonAdd, 
    PersonRemove
} from '@mui/icons-material'

function Overview() {
    const [currentStat, setCurrentStat] = useState({});
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        const currentsub = firestore.collection('reserveBed').doc(auth.currentUser.uid).onSnapshot((doc) => {
            setCurrentStat(doc.data());
        })
        const activitySub = firestore.collection('reserveBed').doc(auth.currentUser.uid).collection('activities').onSnapshot((snapshot) => {
            let results = [];
            snapshot.forEach((doc) => { 
                results.push(doc.data())
            })
            setActivities(results)
        })
        return () => {
            currentsub();
            activitySub();
        }
    }, [])
    return (
        <>
            <Sidebar />
            <div className="bord-overview">
                <div className='Overview-Text'>
                    <h1>ภาพรวม</h1>
                </div>
                <div className='Overview-Content'>
                    <div className='Overview-Content-Left'>
                        <div className='Status-Top'>
                            <div className='Status-Top-Left'>
                                <h2>เตียงเหลือ</h2>
                                <div>
                                    <KingBed sx={{fontSize: '3rem', color: 'white'}} />
                                    <div>
                                        <h1>{currentStat.available}</h1>
                                        <p>/{currentStat.allBed}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='Status-Top-Mid'>
                                <h2>ผู้ป่วยเข้า</h2>
                                <div>
                                    <PersonAdd sx={{fontSize: '3rem', color: 'white'}} />
                                    <h1>{currentStat.today_in}</h1>
                                </div>
                            </div>
                            <div className='Status-Top-Right'>
                                <h2>ผู้ป่วยออก</h2>
                                
                                <div>
                                    <PersonRemove sx={{fontSize: '3rem'}} />
                                    <h1>{currentStat.today_out}</h1>
                                </div>
                            </div>
                        </div>
                        <div className='Status-Chart'>
                            <div className='Chart-Box'>
                                <OverviewChart/>
                            </div>
                        </div>
                    </div>
                    <div className='Overview-Content-Right'>
                        <div className='Activity-Box'>
                            <h2 className='Daily-Activity-Text'>Daily Activity</h2>
                            {activities.map((item, index) => {
                                return(
                                    <div className='Activity'>
                                        <div>
                                            <p className='title'>{item.patient_name}</p>
                                            <p className='description'>{item.roomType}</p>
                                        </div>
                                        {item.type === 'accept' ? 
                                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',padding: '5px 0px', backgroundColor: '#5ef48b', borderRadius: 10, width: 60}}>
                                                <p className='typeActi'>เข้า</p>
                                            </div>
                                            : <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 0px', backgroundColor: '#ff6969', borderRadius: 10, width: 60}}>
                                                <p className='typeActi'>ออก</p>
                                            </div> 
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overview