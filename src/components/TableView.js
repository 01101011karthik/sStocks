import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { commaSaperater, isSrtingValueReal } from '../utils';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from "@material-ui/core/Fade";
import TablePlaceHolder from './TablePlaceHolder'
import Loading from './Loading';

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


export default function TableView(props) {
  const classes = useStyles();

  const sourceType = localStorage.getItem('source_type');

  const { stocks:{payload}, showFor, loading, errorMessage } = props;

  return (
    <>
      {  
        !loading && payload && payload.results && payload.results.length ?
          <Paper>
            <div className="ss-table-container">
              <TableContainer component={Paper}>
                  <Table className={classes.table} size='small' aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tablecell} align="left">Name</TableCell>
                        <TableCell className={classes.tablecell} align="left">Ticker</TableCell>
                        <TableCell className={classes.tablecell} align="left">Industry</TableCell>
                        <TableCell className={classes.tablecell} align="left">Sector</TableCell>
                        <TableCell className={classes.tablecell} align="left">Market Capital</TableCell>
                        <TableCell className={classes.tablecell} align="center">{sourceType} ({showFor})</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        payload.results.map((stock, index) => (
                          <TableRow key={`${stock.ticker}_${index}`}>
                            <TableCell component="th" scope="row">{stock.name}</TableCell>
                            <TableCell component="th" scope="row">{stock.ticker}</TableCell>
                            <Tooltip 
                                  TransitionProps={{ timeout: 0 }}
                                  TransitionComponent={Fade}
                                  PopperProps={{
                                    popperOptions: {
                                      modifiers: {
                                        offset: {
                                          enabled: true,
                                          offset: '-10px, 0px',
                                        },
                                      },
                                    },
                                  }} arrow={true} title={isSrtingValueReal(stock.industry) ? stock.industry : 'Not found'} placement='top'>
                              <TableCell className={classes.tablecellEllipsis} component="th" scope="row">{isSrtingValueReal(stock.industry) ? stock.industry : '-'}</TableCell>
                            </Tooltip>
                            <TableCell component="th" scope="row">{isSrtingValueReal(stock.sector) ? stock.sector :  '-'}</TableCell>
                            <TableCell component="th" scope="row">{commaSaperater(stock.marketCapital)}</TableCell>
                            <TableCell component="th" scope="row" align="center">{stock[sourceType][showFor]}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
              </TableContainer>
            </div>
          </Paper>
          : 
          <TablePlaceHolder>
            {
              errorMessage ? 
              <TableRow style={{color: 'red'}}>{errorMessage}</TableRow> 
              :
              payload && payload.total && !payload.results.length ? 
                <>
                  <TableRow style={{color: '#0270e1'}}>No results found</TableRow>
                </> 
                :
                <> 
                  <p>Loading stocks</p>
                  <Loading />
                </>
            }
          </TablePlaceHolder>
      }
    </>
  );
}