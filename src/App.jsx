import React, { useState, useEffect } from "react";
import AppHeader from "./components/AppHeader";
import SideNavbar from "./components/SideNavbar";
import Footer from "./components/Footer";
import AppSetting from "./components/AppSetting";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./LoginComponents/Login";
import Employees from "./EmployeeComponent/Employees";
import Device from "./Master/Device";
import AddDevice from "./Master/DeviceMaster/AddDevice";
import RightsDistribution from "./Master/RightsDistribution";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import LeaveBalance from "./Master/LeaveBalance";
import AddLeaveBalance from "./Master/AddLeaveBalance";


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("Usercode"));


  useEffect(() => {
    setIsAuthenticated(!!sessionStorage.getItem("Usercode"));
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  return (

    <Router>
      <div className="wrapper">
        {isAuthenticated && <AppHeader onLogout={handleLogout} />}
        {isAuthenticated && <SideNavbar />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/Dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/Employee" element={isAuthenticated ? <Employees /> : <Navigate to="/" />} />
            <Route path="/Device" element={isAuthenticated ? <Device /> : <Navigate to="/" />} />
            <Route path="/AddDevice" element={isAuthenticated?<AddDevice/>:<Navigate to ="/"/>}/>
            <Route path="/RightsDistribution" element={isAuthenticated?<RightsDistribution/>:<Navigate to ='/'/>}/>
            <Route path="/LeaveBalance" element ={isAuthenticated ? <LeaveBalance/>:<Navigate to={'/'}/>}/>
            <Route path="/AddLeaveBalance" element = {isAuthenticated ? <AddLeaveBalance/>:<Navigate to={'/'}/>}/>
          </Routes>
        </div>
        {isAuthenticated && <Footer />}
      </div>
    </Router>

  );
};

export default App;
