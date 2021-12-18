import Sidebar from './components/Sidebar';
import { Routes, Route, Link } from "react-router-dom";
import Overview from './pages/Overview';
import Request from './pages/Request';
import Patient from './pages/Patient';
import Setting from './pages/Setting';
import UserManager from './pages/UserMangaer';



function App() {
  return (
      <div className="App">
        <Sidebar />
        <Routes Routes>
        <Route exact path="/" element={<Overview />} />
        <Route path="request" element={<Request />} />
        <Route path="patient" element={<Patient />} />
        <Route path="setting" element={<Setting />} />
        <Route path="usermanager" element={<UserManager />} />
        </Routes>
      </div>
  );
}

export default App;
