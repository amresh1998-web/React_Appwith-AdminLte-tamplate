import {React,useState,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Textbox from '../../CommonComponents/Textbox';
import { useSelector,useDispatch } from 'react-redux';
import { removeDevice,fetchDevices,setEditDevice } from '../../Redux/DeviceSlice';

export const AddDevice = () => {  
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const editDevice = useSelector((state) => state.device.editDevice);

    useEffect(() => {
        if (editDevice) {
            setFormData(editDevice);
        }
      }, 
    [editDevice]);

    const [formData, setFormData] = useState({
        Mastcode: editDevice.MASTCODE || '',
        DeviceName: editDevice.MASTNAME || '',
        Deviceport: editDevice. DEVICEPORT || '',
        devicemode: editDevice.DEVICEMODE || '',
        Deviceid: editDevice.DEVICEID || '',
        devicepassword: editDevice.DEVICEPASSWORD || '',
        devicetype: editDevice.DEVICETYPE || '',
        deviceip: editDevice.DEVICEIPADDRESS || '',
        deviceserialno: editDevice.DEVICESERIALNO || '',
        department: editDevice. DEPARTMENT || '',
      });

      console.warn(editDevice);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("test");
      };
    

    return (
        <div className='content-wrapper'>
            <div className='content-header'>
                <div className='container-fluid'>
                    <h3>{formData.Mastcode ? 'Edit Device' : 'Add Device'}</h3>
                </div>
                <section className='content'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='card-body'>
                                    <form onSubmit={handleSubmit}>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <Textbox
                                                    label="Device Name"
                                                    name="DeviceName"
                                                    value={formData.DeviceName}
                                                    onChange={handleChange}
                                                    required
                                                />

                                                <Textbox
                                                    label="Device Port"
                                                    name="Deviceport"
                                                    value={formData.Deviceport}
                                                    onChange={handleChange}
                                                    required
                                                />

                                                <Textbox
                                                    label="Device Mode"
                                                    name="devicemode"
                                                    value={formData.devicemode}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {/* <Textbox
                                                    label="Designation"
                                                    name="desiganation"
                                                    value={''}
                                                    onChange={''}
                                                    required
                                                /> */}

                                            </div>

                                            <div className='col-md-4'>

                                                <Textbox
                                                    label="Device Id"
                                                    name="Deviceid"
                                                    value={formData.Deviceid}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <Textbox
                                                    label="Device Password"
                                                    name="devicepassword"
                                                    value={formData.devicepassword}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <Textbox
                                                    label="Device Type"
                                                    name="devicetype"
                                                    value={formData.devicetype}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>
                                            <div className='col-md-4'>
                                                <Textbox
                                                    label="Device IP Address"
                                                    name="deviceip"
                                                    value={formData.deviceip}
                                                    onChange={handleChange}
                                                    required
                                                />

                                                <Textbox
                                                    label="Device Serial No."
                                                    name="deviceserialno"
                                                    value={formData.deviceserialno}
                                                    onChange={handleChange}
                                                    required
                                                />

                                                <Textbox
                                                    label="Department"
                                                    name="department"
                                                    value={formData.department}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>
                                        </div>
                                        
                                        <div className='row'>
                                            <div className='col-md-4 p-3'>
                                                <button className='btn btn-primary m-3'  type="submit">
                                                     {formData.Mastcode ? 'Update' : 'Save'} 
                                                </button>
                                                <a className='btn btn-light' onClick={() => navigate('/Device')}>Back</a>
                                            </div>
                                            {/* <div className='col-md-4 '>
                                                <a className='btn btn-light' onClick={() => navigate('/Device')}>Back</a>

                                            </div> */}
                                        </div>
                                        </form>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
};
export default AddDevice;