import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { Login } from './frontlogin/login';
import { Navbarcompoenent } from './navbar/navbar';
import { Register } from './frontlogin/register';
import { Homecompo } from './homecomponenet/homecompo';
import Protectedroute from './protected';
import { useAuth } from './authcontext';
import { Home } from './home/home';
import EmployeeTable from './homecomponenet/emploeelist';

function App() {
  const { isauthenticated } = useAuth();

  return (
    <div>
      <div>
        <Navbarcompoenent />
      </div>
      <Routes>
        {/* Redirect from root (/) to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={!isauthenticated ? <Login /> : <Homecompo />} />
        <Route path="/homecompoenet" element={<Protectedroute><Homecompo /></Protectedroute>} />
        <Route path="/editemployee" element={<Homecompo />} />
        <Route path="/employeelist" element={<Protectedroute><EmployeeTable /></Protectedroute>} />
      </Routes>
    </div>
  );
}

export default App;
