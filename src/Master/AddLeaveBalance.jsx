import React, { useState, useEffect } from "react";
import apiService from "../ApiServices/ApiServices";
import { useNavigate, useLocation } from "react-router-dom";
import Textbox from "../CommonComponents/Textbox";





const AddLeaveBalance = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const leave = location.state?.editLeave || {};  
    const [suggest,setSuggestions] = useState([]);
    const [year, setYear] = useState("");
    const [years, setYears] = useState([]);
    const [leaveBalance, setLeaveBalance] = useState({
        MASTCODE: leave.MASTCODE || '',
        employeeId: leave.EMP_ID || '',
        employeeName: leave.MASTNAME || '',
        employeeDept: leave.DEPARTMENTNAME || '',
        year: leave.YEAR || '',
        CL: leave.CL || "0",
        EL: leave.EL || "0",
        HPL: leave.HPL || "0",
        RH: leave.RH || "0",
    });

    console.warn(leaveBalance);
    useEffect(() => {
        fetchYears();
        fetchSuggestions();
    }, []);

    const fetchYears = async () => {
        try {
            const response = await apiService.get("/DashBoard/ComboYear");
            setYears(response.data);
        } catch (error) {
            console.error("Error fetching year data");
        }
    };


    const fetchSuggestions = async (value) => {
        try {
          const response = await apiService.post("/Employee/ComboFillForwardingEmployeeId_Leave/", {
            prefix: value,
          });
    
          setSuggestions(response.data || []);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeaveBalance((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiService.post("/Master/LeaveBalanceNew", {
                EmployeeId: employeeId,
                Year: year,
                ...leaveBalance,
            });
            console.success("Leave balance saved successfully");
        } catch (error) {
            console.error("Error saving leave balance");
        }
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className='row mb-2'>
                        <div className='col-sm-6'>
                            <h2>Add Leave Balance</h2>
                        </div>
                        <div>
                            <P>test</P>
                            </div>

                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">

                            <div className="col-md-12">
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col-md-4">
                                                <Textbox
                                                    label="Employee Id"
                                                    name="employeeId"
                                                    value={leaveBalance.employeeId}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Textbox label="Employee Name" name="employeename" value={leaveBalance.employeeName} onChange={handleChange} required disabled/>
                                                
                                            </div>
                                            <div className="col-md-4">
                                                <label>Employee Department:</label>
                                                <input type="text" className="form-control" value={leaveBalance.employeeDept} disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <h3>Leave Details</h3>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="mb-3">
                                                        <label>Year:</label>
                                                        <select className="border p-2 w-full" value={leaveBalance.year} onChange={(e) => setYear(e.target.value)}>
                                                            <option value="">Select Year</option>
                                                            {years.map((y) => (
                                                                <option key={y.MASTCODE} value={y.MASTCODE}>
                                                                    {y.MASTNAME}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label>CL:</label>
                                                        <input type="number" name="CL" className="form-control" value={leaveBalance.CL} onChange={handleChange} />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>EL:</label>
                                                        <input type="number" name="EL" className="form-control" value={leaveBalance.EL} onChange={handleChange} />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>HPL:</label>
                                                        <input type="number" name="HPL" className="form-control" value={leaveBalance.HPL} onChange={handleChange} />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>RH:</label>
                                                        <input type="number" name="RH" className="form-control" value={leaveBalance.RH} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary m-3">Save</button>
                                    <a className='btn btn-light' onClick={() => navigate('/LeaveBalance')}>Back</a>
                                </form>
                            </div>
                        </div>
                    </div >
                </section >
            </div >
        </div >
    );
};

export default AddLeaveBalance;
