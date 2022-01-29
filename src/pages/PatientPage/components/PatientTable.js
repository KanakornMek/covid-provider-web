import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
    Avatar,
    Button,
    Paper,
    TableRow,
    TableHead, TableContainer, TableBody, Table
} from '@mui/material';
import PatientModal from './PatientModal';
import { auth, firestore } from '../../../components/firebase';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#156ACD',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: 'white'

}));



export default function CustomizedTables({selected, isArrived, searchTerm,}) {
    const [selectedData, setSelectedData] = useState({});

    const [openModal, setOpenModal] = useState(false);
    const [patientsBed, setPatientsBed] = useState([]);
    const [patientsHome, setPatientsHome] = useState([]);
    useEffect(() => {
        console.log(auth.currentUser.uid);
        const bedSubscriber = firestore.collection('reserveBed').doc(auth.currentUser.uid).collection('patients').onSnapshot((snapshot) => {
            var results = [];
            if (!snapshot.empty) {
                snapshot.forEach((doc) => {
                    results.push({ id: doc.id, data: doc.data() });

                })
            }
            setPatientsBed(results);
            console.log(results)
        });
        const homeSubscriber = firestore.collection('homeIsolate').doc(auth.currentUser.uid).collection('patients').onSnapshot((snapshot) => {
            var results = [];
            if (!snapshot.empty) {
                snapshot.forEach((doc) => {
                    results.push({ id: doc.id, data: doc.data() });

                })
            }
            setPatientsHome(results);
            console.log(results)
        });

        return () => {
            bedSubscriber();
            homeSubscriber();
        };
    }, [])

    return (
        <>
            {openModal && <PatientModal open={openModal} setOpen={setOpenModal} selected={selected} patientData={selectedData} />}
            <TableContainer sx={{ width: '100%' }} component={Paper}>
                <Table sx={{}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            <StyledTableCell>ชื่อ</StyledTableCell>
                            {selected === 1 && <StyledTableCell>ชนิดห้อง</StyledTableCell>}
                            {selected === 1 && <StyledTableCell>รหัสเตียง</StyledTableCell>}
                            {selected === 1 && <StyledTableCell>สถานะ</StyledTableCell>}

                            <StyledTableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selected===1 ? 
                            patientsBed.filter((val) => {
                                if(searchTerm == ""){
                                    return val;
                                } else if((val.data.firstname + val.data.lastname).toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return val;
                                }
                            }).map((patient, index) => {
                                if(isArrived === patient.data.arrived){
                                    return (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>
                                                <Avatar src={''} />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {patient.data.firstname + ' ' + patient.data.lastname}
                                            </StyledTableCell>
                                            <StyledTableCell>{patient.data.roomType}</StyledTableCell>
                                            <StyledTableCell>{patient.data.bedId}</StyledTableCell>
                                            <StyledTableCell>{patient.data.arrived ? 'เข้ารับบริการแล้ว' : 'ยังไม่เข้ารับบริการ'}</StyledTableCell>
                                            <StyledTableCell align='right' >
                                                <Button sx={{
                                                    '&:hover': {
                                                        backgroundColor: '#001f54'
                                                    },
                                                    backgroundColor: '#155ACD',
                                                    color: 'white'
                                                }}
                                                    variant="contained"
                                                    onClick={() => {
                                                        setSelectedData(patient);
                                                        setOpenModal(true);
                                                    }}
                                                >
                                                    Detail
                                                </Button>
                                            </StyledTableCell>
        
                                        </StyledTableRow>
                                    );
                                }
                                return;
                            })
                            : patientsHome.filter((val) => {
                                if(searchTerm == ""){
                                    return val;
                                } else if((val.data.firstname + val.data.lastname).toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return val;
                                }
                            }).map((patient, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>
                                            <Avatar src={''} />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {patient.data.firstname + ' ' + patient.data.lastname}
                                        </StyledTableCell>
                                        <StyledTableCell align='right' >
                                            <Button sx={{
                                                '&:hover': {
                                                    backgroundColor: '#001f54'
                                                },
                                                backgroundColor: '#155ACD',
                                                color: 'white'
                                            }}
                                                variant="contained"
                                                onClick={() => {
                                                    setSelectedData(patient);
                                                    setOpenModal(true);
                                                }}
                                            >
                                                Detail
                                            </Button>
                                        </StyledTableCell>
    
                                    </StyledTableRow>
                                );
    
                            })
                        }
                        
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}
