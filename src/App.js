import Sidebar from './components/Sidebar';
import { Routes, Route, Link } from "react-router-dom";
import Overview from './pages/Overview';
import Request from './pages/Request';
import Patient from './pages/Patient';
import Setting from './pages/Setting';
import UserManager from './pages/UserMangaer';
import LandingPage from './components/LandingPage';
import { AuthProvider } from '../src/contexts/AuthContext';



function App() {
  return (
      <div className="App">
        <AuthProvider>
          <Routes Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="overview" element={<Overview />} />
          <Route path="request" element={<Request />} />
          <Route path="patient" element={<Patient />} />
          <Route path="setting" element={<Setting />} />
          <Route path="usermanager" element={<UserManager />} />
          </Routes>
        </AuthProvider>
      </div>
  );
}

export default App;
