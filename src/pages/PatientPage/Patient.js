import { useEffect, useState } from 'react'
import './Patient.css'
import Sidebar from '../../components/Sidebar';
import CustomizedTables from './components/PatientTable';
import { functions } from '../../components/firebase';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    TextField
} from '@mui/material';

function Patient() {
    const [selectedService, setSelectedService] = useState(1);
    const [isArrived, setIsArrived] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div>
            <Sidebar />
            <div className="bord-patient">
                <div className='table' >
                    <h2 className='patient_title'>รายชื่อผู้ป่วย</h2>
                    <div style={{ display: 'flex', gap: 10, margin: '10px 0px'}}>
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
                        {selectedService === 1 && 
                            <FormControlLabel control={<Checkbox value={isArrived} onChange={(e) => {
                                setIsArrived(e.target.checked)
                            }} />} label="เข้ารับบริการแล้ว" />
                        }
                    </div>
                    <CustomizedTables selected={selectedService} isArrived={isArrived} searchTerm={searchTerm} />
                </div>
            </div>
        </div>
    )
}

export default Patient;