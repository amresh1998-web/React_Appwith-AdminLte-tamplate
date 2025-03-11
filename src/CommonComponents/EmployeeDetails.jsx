import React from "react";

const EmployeeDetail = ({ employee }) => {
  if (!employee) {
    return <p>Loading employee details...</p>;
  }

  const imgSrc = `data:image/gif;base64,${employee.Photo}`;
  // const imgSrcSign = `data:image/gif;base64,${employee.Sign}`;

  return (
    <div className="employee-card">
      <h4 className="employee-title">Employee Details</h4>
      <hr />
      <div className="container-fluid">
        <div className="col-md-12">
          <div className="employee-info">
            <div className="employee-data">
              <div className="col-md-12">
                <div className="row ">
                  <div className="col-lg-10">
                    <div className="row">
                      <div className="col-lg-2"><strong >Staff No:</strong></div>
                      <div className="col-lg-4">{employee.EmployeeId}</div>

                      <div className="col-lg-2"><strong >SAIL Pl. No:</strong></div>
                      <div className="col-lg-4">{employee.SailPNo}</div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-lg-2"><strong >Name:</strong></div>
                      <div className="col-lg-4">{employee.MastName}</div>
                      
                      <div className="col-lg-2"><strong >Designation:</strong></div>
                      <div className="col-lg-4">{employee.DesignationName}</div>

                    </div>
                    <br />

                    <div className="row">
                      <div className="col-lg-2"><strong >Email:</strong></div>
                      <div className="col-lg-4">{employee.Email}</div>

                      <div className="col-lg-2"><strong >Mobile:</strong></div>
                      <div className="col-lg-4">{employee.Mobile}</div>

                    </div>
                    <br />
                    <div className="row">
                      <div className="col-lg-2"><strong >Division:</strong></div>
                      <div className="col-lg-4">{employee.Division}</div>

                      <div className="col-lg-2"><strong >Department:</strong></div>
                      <div className="col-lg-4">{employee.DepartmentName}</div>

                    </div>
                    <br />
                    <div className="row">
                      <div className="col-lg-2"><strong >Section:</strong></div>
                      <div className="col-lg-4">{employee.Section}</div>

                      <div className="col-lg-2"><strong >Sub-Section:</strong></div>
                      <div className="col-lg-4">{employee.SubSection}</div>

                    </div>
                    <br />
                    <div className="row">
                      <div className="col-lg-2"><strong >Role in System:</strong></div>
                      <div className="col-lg-4">{employee.RoleName}</div>

                      <div className="col-lg-2"><strong >Emergency Contact:</strong></div>
                      <div className="col-lg-4">{employee.EmergencyContactNo}</div>

                    </div>
                    <br />
                    <div className="row">
                      <div className="col-lg-2"><strong >Controlling Officer:</strong></div>
                      <div className="col-lg-4">{employee.ControllingOfficer}</div>

                      <div className="col-lg-2"><strong >H.O.D.:</strong></div>
                      <div className="col-lg-4">{employee.Hod}</div>

                    </div>
                    <br />

                    <div className="row">
                      <div className="col-lg-2"><strong >Final Tour Approving Authority:</strong></div>
                      <div className="col-lg-4">{employee.TourAuthority}</div>

                      <div className="col-lg-2"><strong >Vehicle 1:</strong></div>
                      <div className="col-lg-4">({employee.FirstVehicleType}) ({employee.FirstVehicleNumber})</div>

                    </div>
                    <br />

                    <div className="row">
                      <div className="col-lg-2"><strong >Vehicle 2:</strong></div>
                      <div className="col-lg-4">({employee.SecondVehicleType}) ({employee.SecondVehicleNumber})</div>

                      <div className="col-lg-2"><strong >Authorized Punch Location:</strong></div>
                      <div className="col-lg-4">({employee.LocationName}) </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div className="employee-photo">
              <img src={imgSrc} alt="Employee" height="170" width="150" />

            </div>
          </div>


        </div>

      </div>

    </div>
  );
};

export default EmployeeDetail;
