import React, { useEffect, useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import DataTableComponent from "../CommonComponents/DataTableComponent";
import apiService from "../ApiServices/ApiServices";


const LeaveBalance = () => {
    const [leaveData, setLeaveData] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const handleEdit = (row) => {
        console.log("Edit Device with MASTCODE:", row);
        navigate('/AddLeaveBalance', { state: { editLeave: row } });
      };


    useEffect(() => {
        fetchYearOptions();
        fetchLeaveBalance();
    }, [selectedYear]);

    // Fetch available years for the dropdown
    const fetchYearOptions = async () => {
        try {
            const response = await apiService.get("/DashBoard/ComboYear", { });
            if (response.data) {
                setYearOptions(response.data);
                const currentYear = new Date().getFullYear();
                const foundYear = response.data.find((y) => parseInt(y.MASTCODE) === currentYear);
                setSelectedYear(foundYear ? foundYear.MASTCODE : response.data[0]?.MASTCODE || 0);
            }
        } catch (error) {
            console.error("Error fetching year options:", error);            
        }
    };

    // Fetch leave balance data
    const fetchLeaveBalance = async () => {
        setLoading(true);
        try {
            const response = await apiService.get(`/LeaveBalance/GetAllLeaveBalance/0?year=${selectedYear}`, {});
            if (response.data?.Table) {
                setLeaveData(response.data.Table);
            }
        } catch (error) {
            console.error("Error fetching leave balance:", error);           
        } finally {
            setLoading(false);
        }
    };

    // Define columns for react-data-table-component
    const columns = [
        { name: "Staff Number", selector: (row) => row.EMP_ID, sortable: true },
        { name: "Name of Employee", selector: (row) => row.MASTNAME, sortable: true },
        { name: "Department", selector: (row) => row.DEPARTMENTNAME, sortable: true },
        { name: "Year", selector: (row) => row.YEAR, sortable: true },
        { name: "CL", selector: (row) => row.CL, sortable: true },
        { name: "EL", selector: (row) => row.EL, sortable: true },
        { name: "HPL", selector: (row) => row.HPL, sortable: true },
        { name: "RH", selector: (row) => row.RH, sortable: true },
        {
            name: "Action",
            cell: (row) => (

                <div className='row ml-2'>
                    <button className="btn btn-sm btn-primary" onClick={() => handleEdit(row)}>Edit</button>

                    {/* <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.MASTCODE)}>Delete</button> */}

                </div>

            ),
            ignoreRowClick: true,
            allowoverflow: true,
            button: true,
        },
    ];

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className='row mb-2'>
                        <div className='col-sm-6'>
                            <h2>Manage Leave Balance</h2>
                        </div>
                        <div className='col-sm-6'>
                            <ol className='breadcrumb float-sm-right'>
                                <li className='breadcrumb-item'>
                                    <Link to='/AddLeaveBalance' className="btn btn-primary">Add Leave Balance</Link>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className=" mb-4 col-md-4">
                                            <label className="block font-medium p-2 ">Year</label>
                                            <select className="border p-2 w-full"
                                                value={selectedYear}
                                                onChange={(e) => setSelectedYear(e.target.value)} >
                                                <option value="">Select Year</option>
                                                {yearOptions.map((year) => (
                                                    <option key={year.MASTCODE} value={year.MASTCODE}>
                                                        {year.MASTNAME}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <DataTableComponent
                                    columns={columns}
                                    data={leaveData}
                                    progressPending={loading}
                                    pagination
                                    highlightOnHover
                                    customStyles={{
                                        headRow: { style: { backgroundColor: "#f8f9fa", fontWeight: "bold" } },
                                        rows: { style: { borderBottom: "1px solid #ddd" } },
                                        cells: { style: { borderRight: "1px solid #ddd", padding: "10px" } },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LeaveBalance;
