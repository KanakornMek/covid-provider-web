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
import RequestModal from './RequestModal';
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


export default function CustomizedTables({ selected, searchTerm }) {
    const [selectedData, setSelectedData] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [requestsBed, setRequestsBed] = useState([]);
    const [requestsHome, setRequestsHome] = useState([]);
    useEffect(() => {
        console.log(auth.currentUser.uid);
        const bedSubscriber = firestore.collection('reserveBed').doc(auth.currentUser.uid).collection('requests').onSnapshot((snapshot) => {
            var results = [];
            if (!snapshot.empty) {
                snapshot.forEach((doc) => {
                    results.push({ id: doc.id, data: doc.data() });

                })
            }
            setRequestsBed(results);
            console.log(results)
        });
        const homeSubscriber = firestore.collection('homeIsolate').doc(auth.currentUser.uid).collection('requests').onSnapshot((snapshot) => {
            var results = [];
            if (!snapshot.empty) {
                snapshot.forEach((doc) => {
                    results.push({ id: doc.id, data: doc.data() });

                })
            }
            setRequestsHome(results);
            console.log(results)
        });

        return () => {
            bedSubscriber();
            homeSubscriber();
        };
    }, [])

    return (
        <>
            {openModal && <RequestModal open={openModal} setOpen={setOpenModal} selected={selected} reqData={selectedData} />}
            <TableContainer sx={{ width: '100%' }} component={Paper}>
                <Table sx={{}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            <StyledTableCell >ชื่อ</StyledTableCell>
                            {selected === 1 && <StyledTableCell >ชนิดห้อง</StyledTableCell>}


                            <StyledTableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selected === 1 ? requestsBed.filter((val) => {
                            if (searchTerm == "") {
                                return val;
                            } else if ((val.data.firstname + val.data.lastname).toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            }
                        }).map((request, index) => {
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>
                                        <Avatar src={''} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {request.data.firstname + request.data.lastname}
                                    </StyledTableCell>
                                    <StyledTableCell >{request.data.roomType}</StyledTableCell>

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
                                                setSelectedData(request);
                                                setOpenModal(true);
                                            }}
                                        >
                                            Detail
                                        </Button>
                                    </StyledTableCell>

                                </StyledTableRow>
                            );

                        }) : requestsHome.filter((val) => {
                            if (searchTerm == "") {
                                return val;
                            } else if ((val.data.firstname + val.data.lastname).toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            }
                        }).map((request, index) => {
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>
                                        <Avatar src={''} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {request.data.firstname + request.data.lastname}
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
                                                setSelectedData(request);
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