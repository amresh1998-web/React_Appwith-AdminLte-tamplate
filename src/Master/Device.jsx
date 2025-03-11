import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTableComponent from '../CommonComponents/DataTableComponent';
import { useSelector,useDispatch } from 'react-redux';
import { fetchDevices,removeDevice,setEditDevice } from '../Redux/DeviceSlice';



export const Device = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { devices, loading } = useSelector((state) => state.device);



  // const handleEdit = (row) => {
  //   console.log("Edit Device with MASTCODE:", row);
  //   navigate('/AddDevice', { state: { editdevice: row } });
  // };



  // const handleDelete = (mastCode) => {
  //   // if (window.confirm("Are you sure you want to delete this device?")) {
  //   //   axios.delete(`https://api.example.com/devices/${mastCode}`) // Replace with actual API endpoint
  //   //     .then(() => {
  //   //       alert("Device deleted successfully!");
  //   //       setDevices(devices.filter(device => device.MASTCODE !== mastCode));
  //   //     })
  //   //     .catch(error => {
  //   //       console.error("Error deleting device:", error);
  //   //       alert("Failed to delete the device.");
  //   //     });
  //   // }
  // };

  // const table = useTable({ columns, data });
  // useEffect(() => {
  //   const fetchDeviceDetails = async () => {
  //     setLoading(true); // Start loading
  //     try {
  //       const response = await apiService.get(`/Device/GetDevices`);
  //       if (response.data?.Table) {
  //         setDevice(response.data.Table);

  //       } else {
  //         setDevice([]); // Ensure an empty array if no data
  //       }
  //     } catch (err) {
  //       console.error("Error fetching device details:", err);
  //     }
  //     setLoading(false); // Stop loading after API call
  //   };

  //   fetchDeviceDetails();
  // }, []);

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  const handleEdit = (row) => {
    dispatch(setEditDevice(row)); 
    navigate('/AddDevice'); 
  };

  const handleDelete = (mastCode) => {
    dispatch(removeDevice(mastCode));
  };



  const columns = [
    { name: "Device Name", selector: (row) => row.MASTNAME, sortable: true, },
    { name: "Device Id", selector: (row) => row.DEVICEID, sortable: true, },
    { name: "IP Address", selector: (row) => row.DEVICEIPADDRESS, },
    { name: "Port", selector: (row) => row.DEVICEPORT, },
    { name: "Department", selector: (row) => row.DEPARTMENT, sortable: true },
    { name: "Device Type", selector: (row) => row.DEVICETYPE || "N/A", },
    {
      name: "Action",
      cell: (row) => (
       
          <div className='row ml-2'>
            <button className="btn btn-sm btn-primary" onClick={() => handleEdit(row)}>Edit</button>

            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.MASTCODE)}>Delete</button>         

        </div>    
        
      ),
ignoreRowClick: true,
  allowOverflow: true,
    button: true,
    },
  ];
return (
  <div className='content-wrapper'>
    <div className='content-header'>
      <div className='container-fluid'>
        <div className='row mb-2'>
          <div className='col-sm-6'>
            <h1 className='m-0'>Device</h1>
          </div>
          <div className='col-sm-6'>
            <ol className='breadcrumb float-sm-right'>
              <li className='breadcrumb-item'>
                <Link to='/AddDevice' className="btn btn-primary">Add Device</Link>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <section className='content'>
        <div className='container-fluid'>
          <div class="card">
            <div class="card-header">
              <h3 class="card-title"></h3>
            </div>
            <div class="card-body">
              <DataTableComponent columns={columns} data={devices} progressPending={loading} />
            </div>
          </div>
        </div>
      </section>
    </div >
  </div >
)
};
export default Device;