import Sidebar from './components/Sidebar';
import { Routes, Route, Link } from "react-router-dom";
import Overview from './pages/overview/Overview';
import Request from './pages/requests/Request';
import Patient from './pages/patient/Patient';
import Setting from './pages/Setting';
import UserManager from './pages/UserMangaer';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function App() {
  return (
      <div className="App">
        <Sidebar />
        <div style={{height:'100%', marginLeft: 78}}>

        <Routes Routes>
          <Route exact path="/" element={<Overview />} />
          <Route path="request" element={<Request />} />
          <Route path="patient" element={<Patient />} />
          <Route path="setting" element={<Setting />} />
          <Route path="usermanager" element={<UserManager />} />
        </Routes>
        </div>
      </div>
  );
}

export default App;
