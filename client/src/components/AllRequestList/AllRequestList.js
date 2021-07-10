import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';

const rows: GridRowsProp = [
  { id: 1, col1: 'CEV', col2: 'EVENT 1',col3 : "Approved"},
  { id: 2, col1: 'ACM', col2: 'EVENT 2',col3 : "Rejected" },
  { id: 3, col1: 'DRISHTI', col2: 'EVENT 3',col3 : "Pending..." },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Club Name', width: 500 },
  { field: 'col2', headerName: 'Event Name', width: 500 },
  { field: 'col3', headerName: 'Request Status', width: 500 },
];

const  AllRequestList = () => {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export default AllRequestList;