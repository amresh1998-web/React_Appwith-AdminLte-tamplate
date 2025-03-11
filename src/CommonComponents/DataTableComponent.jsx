import React from 'react';
import DataTable from 'react-data-table-component';
import '../CommonComponents/datatable.css';

const DataTableComponent = ({ title, columns, data,progressPending }) => { 
    
  
  return (
    <DataTable
      title={title}
      columns={columns}      
      data={data}
      progressPending={progressPending}
      pagination      
      highlightOnHover
      striped
      responsive      
     className="data-table"
    />
  );
};

export default  DataTableComponent;