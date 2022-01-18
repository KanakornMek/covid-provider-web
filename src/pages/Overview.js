import React from 'react'
import './CSS/Overview.css'
import Sidebar from '../components/Sidebar';
import { OverviewChart } from '../components/OverviewChart';

function Overview() {
    return (
        <div className='body'>
            <Sidebar />
            <div class="bord-overview">
                <div className='Overview-Text'>
                    <h1>Overview</h1>
                </div>
                <div className='Overview-Content'>
                    <div className='Overview-Content-Left'>
                        <div className='Status-Top'>
                            <div className='Status-Top-Left'>
                                <div className='STL-Left'><h1>Bed Left</h1></div>
                                <div className='STL-Right'><h1>12/30</h1></div>
                            </div>
                            <div className='Status-Top-Mid'>
                                <div className='STM-Left'><h1>Patient In</h1></div>
                                <div className='STM-Right'><h1>12</h1></div>
                            </div>
                            <div className='Status-Top-Right'>
                                <div className='STR-Left'><h1>Patient Out</h1></div>
                                <div className='STR-Right'><h1>12</h1></div>
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
                            <div className='Activity'></div>
                            <div className='Activity'></div>
                            <div className='Activity'></div>
                            <div className='Activity'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview