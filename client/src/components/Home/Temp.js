import * as React from 'react';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Drishti', 'Sample','12/2/20', 'yes', 'yes'),
  createData('Drishti', 'Sample','12/2/20', 'yes', 'yes'),
  createData('Drishti', 'Sample','12/2/20', 'yes', 'yes'),
  createData('Drishti', 'Sample','12/2/20', 'yes', 'yes'),
  
];

export default function BasicTable() {
  return (
      <div style={{marginTop: '100px' , textAlign: 'left',backgroundColor:'white' , marginLeft : '20px',marginRight : '20px',marginBottom : '10px'}}>
      <h5 >Archive</h5>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,textAlign: "center"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Club Name</TableCell>
            <TableCell align="center">Event Name</TableCell>
            <TableCell align="center">Event Date</TableCell>
            <TableCell align="center">Finance Included</TableCell>
            <TableCell align="center">Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}