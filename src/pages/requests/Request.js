import React from 'react'
import CustomizedTables from './components/Table'
import './requests.css'
function Messages() {
    return (
        <div className='table'>
             <div style={{width: '80%'}}>
            
                <div className='text-container'>
                    <p className='text'>Reservation request</p>
                </div>
                <CustomizedTables />
            </div>
        </div>
    );
}

export default Messages