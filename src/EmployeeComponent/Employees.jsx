import React from 'react'
//import DataTable from '../CommonComponents/DataTable';

export const Employees = () => {

    // const columns = [
    //     { name: 'Employee No',selector: row => row.emp_id,sortable: true,},
    //     { name: 'Employee Name',selector: row => row.employee_name,sortable: true,},
    //     { name: 'Email Id', selector: row => row.email_id,sortable: true,},
    //     { name: 'Department Name',selector: row => row.departMent,sortable: true,},
    //     { name: 'Designation Name',selector: row => row.desiganation,sortable: true,},
    //     { name: 'Actions', cell: row => (
    //           <div>
    //               <button onClick={() => handleEdit(row)} style={{ marginRight: '10px' }}>
    //                   <FiEdit  className='icon' style={{height:'25px', width:'100%'}} />
    //               </button>
    //               <button onClick={() => handleDelete(row)}>
    //                   <FiTrash className='icon' style={{height:'25px', width:'100%'}} />
    //               </button>
    //           </div>
    //       ),
    //       ignoreRowClick: true,
    //       allowOverflow: true,
    //       button: true,
    //   },

    //   ];

    return (
        <div className='content-wrapper'>
            <div className='content-header'>
                <div className='container-fluid'>
                    <div className='row mb-2'>
                        <div className='col-sm-6'>
                            <h1 className='m-0'>Employees</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className='content'>
                <div className='container-fluid'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header'>
                                <span>Employee Master</span>
                            </div>
                            <div className='card-body'>
                                {/* <DataTable  columns={columns} data={data} progressPending={loading} />   */}
                            </div>
                        </div>

                    </div>

                </div>

            </section>

        </div>
    )
};
export default Employees;