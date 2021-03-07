import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHead: {
    height: 36,
  },
  tablecell: {
    fontWeight: 'bold',
    '& .MuiTableCell-size': {
      height: '20px'
    }
  },
  tablecellEllipsis:{
    whiteSpace: 'nowrap',
    maxWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default function TablePlaceHolder(props) {
    const classes = useStyles();

    const cellPalceHolders = () => {
      const elements = []
      for(let i=0; i<=20; i++){
        elements.push(<TableRow key={i} className={classes.tableHead}><TableCell /></TableRow>)
      }
    
      return elements;
    }

    return (
        <>
          <Paper>
            <div className="ss-table-container">
              <TableContainer style={{ minHeight: '360px' }}>
                  <Table className={classes.table} size='small' aria-label="a dense table">
                    <TableBody>
                      {cellPalceHolders()}
                    </TableBody>
                  </Table>
              </TableContainer>
              <div className='ss-table-loading-conatainer'>
                {props.children}
              </div>
            </div>
          </Paper>
        </>
    );
}