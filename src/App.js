import Sidebar from './components/Sidebar';
import { Routes, Route, Link, useLocation, Navigate, } from "react-router-dom";
import Overview from './pages/Overview';
import Request from './pages/Request';
import Patient from './pages/Patient';
import Setting from './pages/Setting';
import UserManager from './pages/UserMangaer';
import LandingPage from './components/LandingPage';
import { AuthProvider } from '../src/contexts/AuthContext';
import { useAuth } from '../src/contexts/AuthContext';
import ContactUs from './pages/ContactUs';



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="overview" element={
            <RequireAuth>
              <Overview />
            </RequireAuth>
          } />
          <Route path="request" element={
            <RequireAuth>
              <Request />
            </RequireAuth>
          } />
          <Route path="patient" element={
            <RequireAuth>
              <Patient />
            </RequireAuth>
          } />
          <Route path="setting" element={
            <RequireAuth>
              <Setting />
            </RequireAuth>
          } />
          <Route path="usermanager" element={
            <RequireAuth>
              <UserManager />
            </RequireAuth>
          } />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.currentUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
