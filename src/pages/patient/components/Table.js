import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  Avatar,
  Button,
  Paper,
  TableRow,
  TableHead, TableContainer, TableBody, Table
} from '@mui/material';
import MyModal from './Modal';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'blue',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: 'white'

}));


function createData(picture, name, Type, Bed) {
  return { picture, name, Type, Bed };
}

const rows = [
  createData('https://scontent.fbkk9-2.fna.fbcdn.net/v/t1.6435-9/169541028_3903329323221278_6930460149816589007_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeG6MqdTK_TSsC3nktplKu9ZOrK5pdzKjRo6srml3MqNGs_THDE3HLKppIYWKw4uMJQ8AjITx2gQG1aUekT8jBZV&_nc_ohc=kzSmFsyHAYQAX87Z1sv&_nc_ht=scontent.fbkk9-2.fna&oh=00_AT-QXDVveFWTnntyWAzKv_m6qWo2QbpJHHNr6GTGscRZhA&oe=61E8FD60', 'Mingmongkol Pinijwicha', 'Exclusive', 1),
  createData('https://scontent.fbkk9-3.fna.fbcdn.net/v/t1.6435-9/60934908_471246370287922_187285064009121792_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF_YgzCFP0D5-Vqu2a67am1J426ksx0J5QnjbqSzHQnlAkWvmIWWCbtKXtk97IT_x8h0wCc6ciaG0pGG_tLdrkP&_nc_ohc=UxxAtnwCSOsAX92CPkL&_nc_ht=scontent.fbkk9-3.fna&oh=00_AT89qjcS-pcpEs_sLDNJwtCp5VIIdlG8fUEWQq7ii8SA-w&oe=61EFBD37', 'Kanakorn Suk-ieam', 'Normal', 3),
  createData('https://scontent.fbkk9-2.fna.fbcdn.net/v/t1.6435-9/70860221_527719854466402_5938898872158912512_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_eui2=AeFttcdR-5kNUNiCi-bx4M6cYM5glbCz3tpgzmCVsLPe2t3GKgCYvFiO1NVC6CvWqAPP2lEjg6aEcWLELswP_AQe&_nc_ohc=xZLPUNq17l0AX_i23LU&_nc_ht=scontent.fbkk9-2.fna&oh=00_AT_il_uK5MEJBMtaMd6z3S78CpIy5uujXhWqmQckRwGWcQ&oe=61EC0C7D', 'Ttouch Thareewet', 'Common', 2),
  createData('https://scontent.fbkk12-2.fna.fbcdn.net/v/t39.30808-6/261256269_1261363854366821_1068976462874705248_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGiXxaQo4tP-UNphAFYkWZx-IppSDmoivf4imlIOaiK9_LW6PDlsToxjrsjQndLjAVIw4S-nXuddrg9utt5Zn3F&_nc_ohc=WNaBTcQNWt0AX-84YDh&_nc_ht=scontent.fbkk12-2.fna&oh=00_AT_ABv3kf6TMJV4s30lrlFYYbw5m_M7M8OuHTpqlkUJbnQ&oe=61D396A2', 'Koonsaitan Howong', 'Super Exclusive', 0),

];

export default function CustomizedTables() {
  const [selectedData, setSelectedData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <MyModal open={openModal} setOpen={setOpenModal} data={selectedData} />
      <TableContainer sx={{ width: '80%'}} component={Paper}>
        <Table sx={{}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell >Name</StyledTableCell>
              <StyledTableCell >TYPE</StyledTableCell>
              <StyledTableCell >Bed No.</StyledTableCell>


              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>
                  <Avatar src={row.picture} />
                </StyledTableCell>
                <StyledTableCell>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell >{row.Type}</StyledTableCell>
                <StyledTableCell >{row.Bed}</StyledTableCell>

                <StyledTableCell>
                  <Button sx={{
                    '&:hover': {
                      backgroundColor: 'gray'
                    },
                    backgroundColor: 'blue',
                    color: 'white'
                  }}
                    variant="contained"
                    onClick={() => {
                      setSelectedData(row);
                      setOpenModal(true);
                    }}
                  >
                    Detail
                  </Button>
                </StyledTableCell>

              </StyledTableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      
    </>
  );
}