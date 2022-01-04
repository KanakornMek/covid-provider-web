import React from 'react'
import './CSS/Overview.css'
import Sidebar from '../components/Sidebar';

function Overview() {
    return (
        <div>
            <Sidebar />
            <div class="bord-overview">
                <h1>This is Overview Page</h1>
            </div>
        </div>
    )
}

export default Overview