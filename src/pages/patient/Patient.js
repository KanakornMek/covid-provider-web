import React from 'react'
import CustomizedTables from './components/Table'
import './patient.css'
function Messages() {
    return (
        <div className='table'>
             <div style={{width: '80%'}}>
            
                <div className='text-container'>
                    <p className='text'>PATIENT LIST</p>
                </div>
                <CustomizedTables />
            </div>
        </div>
    );
}

export default Messages