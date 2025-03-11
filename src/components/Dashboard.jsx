import React, { memo, useRef } from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from '../ApiServices/ApiServices';
import EmployeeDetail from '../CommonComponents/EmployeeDetails';
import '../CommonComponents/EmployeeDetails.css';

export const Dashboard = memo(() => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const employeeId = sessionStorage.getItem("EmployeeId");
    const employeeName = sessionStorage.getItem("EmployeeName");
    const token = sessionStorage.getItem("Token");
    const usercode = sessionStorage.getItem("Usercode");
    const hasFetched = useRef(false);
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await apiService.get(`/Dashboard/GetEmployeeDetailsByEmployeeId?employeeId=${employeeId}`);
                if (response.data) {
                    setEmployee(response.data);

                }
            } catch (err) {
                console.error("Error fetching employee details:", err);
            }
        };

        fetchEmployeeDetails();
    }, [employeeId]);

    useEffect(() => {
        if (!usercode) {
            console.warn("User ID not found. Redirecting to login.");
            navigate("/"); // Redirect to login if user is not authenticated
            return;
        }

        if (hasFetched.current) return; // Prevent duplicate calls
        hasFetched.current = true;

        const controller = new AbortController(); // To prevent memory leaks

        const fetchDashboardData = async () => {
            try {
                const response = await apiService.get(`/Dashboard/GetDashBoardCount?id=${usercode}`, {
                    signal: controller.signal,
                });

                if (response.data) {
                    setDashboardData(response.data);

                } else {
                    alert("Failed to fetch dashboard data.");
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Error fetching dashboard data:", err);
                }
            }
        };
        fetchDashboardData();
        return () => controller.abort(); // Cleanup function
    }, [usercode]);

    // Log updated dashboard data
    useEffect(() => {
    }, [dashboardData]);
    return (
        <>
            {/* <div class="preloader flex-column justify-content-center align-items-center">
                <img class="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60" />
            </div> */}
            <div className='content-wrapper '>
                <div className='content-header'>
                    <div className='container-fluid'>
                        <div className='row mb-2'>
                            <div className='col-sm-6'>
                                <h1 className='m-0'>Dashboard</h1>
                            </div>
                            <div className='col-sm-6'>
                                <ol className='breadcrumb float-sm-right'>
                                    <li className='breadcrumb-item'><a href='#'>Home</a></li>
                                    <li className='breadcrumb-item active'>Dashboard v1</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <section className='content'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-lg-3 col-6'>
                                <div className='small-box bg-warning'>
                                    <div className='inner'>
                                        <h3>{dashboardData?.RegisteredEmployee || 0}</h3>
                                        <p >Employee Registrations</p>
                                    </div>
                                    <div className='icon'>
                                        <i className='ion ion-person-add'></i>
                                    </div>
                                    <a href='#' className='small-box-footer'>More info <i className='fas fa-arrow-circle-right'></i></a>
                                </div>
                            </div>
                            <div className='col-lg-3 col-6'>
                                <div className='small-box bg-info'>
                                    <div className='inner'>
                                        <h3>{dashboardData?.TotalDevices || 0}</h3>
                                        <p>Total Device</p>
                                    </div>
                                    <div className='icon'>
                                        <i className='ion ion-bag'></i>
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                            <div className='col-lg-3 col-6'>
                                <div className='small-box bg-success'>
                                    <div className='inner'>
                                        <h3>{dashboardData?.OfflineDevices || 0}</h3>
                                        <p>Offline Devices</p>
                                    </div>
                                    <div className='icon'>
                                        <i className='ion ion-stats-bars'></i>
                                    </div>
                                    <a href='#' className='small-box-footer'>More info<i className='fas fa-arrow-circle-right'></i></a>
                                </div>

                            </div>
                            <div className='col-lg-3 col-6'>

                                <div className='small-box bg-danger'>
                                    <div className='inner'>
                                        <h3>{dashboardData?.OnlineDevices || 0}</h3>

                                        <p>Online Devices</p>
                                    </div>
                                    <div className='icon'>
                                        <i className='ion ion-pie-graph'></i>
                                    </div>
                                    <a href='#' className='small-box-footer'>More info <i className='fas fa-arrow-circle-right'></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='content'>
                    <div className='card'>
                        <EmployeeDetail employee={employee} />
                    </div>
                </section>
            </div>
        </>
    )
});
export default Dashboard;
