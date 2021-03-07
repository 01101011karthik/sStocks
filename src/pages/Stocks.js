import React, {useEffect, useState, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getStocks } from '../store/stocks/actions';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';

const TableViewLazy = lazy(() => import("../components/TableView"));
const Dropdown = lazy(() => import('../components/Dropdown'));

// const TableViewLazy = lazy(() => new Promise((resolve, reject) =>
//         setTimeout(() => resolve(import("./components/TableView")), 10000)
//     )
// )


const useStyles = makeStyles((theme) => ({
    root: {
        '& .Mui-selected': {
            backgroundColor: '#0270e1',
            '&:hover': {
                backgroundColor: '#004993',
                color: '#FFF'
            }
        },
    }
}));


export default function Stocks(){
    const history = useHistory();
    const query = queryString.parse(history.location.search)
    const currentPageNumber = sessionStorage.getItem('active_stocks_page_num') ? sessionStorage.getItem('active_stocks_page_num') : 1;
    const pageNumber = query.page ? parseInt(query.page) : parseInt(currentPageNumber); 
    const classes = useStyles();
    const dispatch = useDispatch();
    const sourceType = localStorage.getItem('source_type');
    const order = localStorage.getItem('sort_order');
    const sourceTypes = ['USD','Bitcoin','Gold','Silver','Nasdaq','Spy','Dow30','CrudeOil'];

    const stocks = useSelector(state => state.stocks);

    const [showForOptions, setShowForOptions] = useState([]);
    const [showFor, setShowFor] = useState('price');


    const { loading, payload, errorMessage } = stocks;


    useEffect(() => {
        sessionStorage.setItem('active_stocks_page_num', pageNumber)
        if(
            !stocks.payload 
        ){
            dispatch(getStocks(sourceType, order, pageNumber))
        }
    },[])

    useEffect(() => {
        if(
            payload && 
            payload.total
        ){
            sessionStorage.setItem('total_items', payload.total)
            const options = stocks.payload.results[0][sourceType];
            if(Object.keys(options).length){
                setShowForOptions(Object.keys(options))
            }
        }
    },[stocks])

    function handleSourceChange(value){
        dispatch(getStocks(value, order, pageNumber))
    }

    function handle_S_ForChange(value){
        setShowFor(value)
    }

    function handlePageChange(e, value){
        history.push(`/stocks?page=${value}`)
        sessionStorage.setItem('active_stocks_page_num', value)
        dispatch(getStocks(sourceType, order, value))
    }

    return(
        <>
            <NavBar />
            {
                <Container maxWidth='xl'>
                    <div className="row-filters-date">
                        {
                            <p>
                                {
                                    !loading && payload && payload.total ?
                                    `Data as of ${payload.date}` : `Data as of ${new Date().getFullYear()}`
                                }
                            </p>

                        }
                        <div className="table-filters-container">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Dropdown loading={loading} errorMessage={errorMessage} label='source' options={sourceTypes} onChange={handleSourceChange}/>
                            <Dropdown loading={loading} errorMessage={errorMessage} label='for' value={showFor} options={showForOptions} onChange={handle_S_ForChange} />
                        </Suspense>
                        </div>
                    </div>
                    <Suspense fallback={<Loading />}>
                        <TableViewLazy
                            stocks={stocks} 
                            showFor={showFor} 
                            loading={loading}
                            errorMessage={errorMessage}
                        />
                    </Suspense>
                    <div className="pagination-container">
                        {
                            sessionStorage.getItem('total_items') ?
                                <Pagination
                                    disabled={loading}
                                    onChange={handlePageChange}
                                    className={classes.root}
                                    page={pageNumber}
                                    count={Math.floor(sessionStorage.getItem('total_items')/20)} 
                                    size='medium' 
                                    color="primary"
                                /> : null
                        }
                    </div>
                </Container>
            }
        </>
    )
}