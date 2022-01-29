import React from 'react'
import './CSS/Usermanager.css'
import Sidebar from '../components/Sidebar';

function Filemanager() {
    return (
        <div>
            <Sidebar />
            <div className="bord-usermanager">
                <h1>This is Usermanager Page</h1>
            </div>
        </div>
    )
}

export default Filemanager