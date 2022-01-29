import React, { useState } from 'react'
import './Request.css'
import Sidebar from '../../components/Sidebar';
import CustomizedTables from './components/RequestTable';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@mui/material';
import firebase from 'firebase/compat';
import { auth, firestore, functions } from '../../components/firebase';
import {
    InputLabel,
    Select,
    FormControl,
    MenuItem,
    TextField
} from '@mui/material'

function Request() {
    const { logout } = useAuth();
    const [selectedService, setSelectedService] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <>
            <Sidebar />
            <div className="bord-request">

                <div className='table' >

                    <h2 className='req_title'>คำขอการจอง</h2>
                    <div style={{ display: 'flex', gap: 10, margin: '10px 0px' }}>

                        <FormControl>
                            <InputLabel id="demo-simple-select-label">บริการ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedService}
                                label="service"
                                onChange={(e) => {
                                    setSelectedService(e.target.value)
                                }}
                            >
                                <MenuItem value={1}>บริการเตียง</MenuItem>
                                <MenuItem value={2}>บริการกักตัวที่บ้าน</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="ค้นหา" />
                    </div>
                    <CustomizedTables selected={selectedService} searchTerm={searchTerm} />
                </div>
            </div>
        </>
    )
}

export default Request