import React from "react";
import Login from '../pages/Login';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from '../pages/Home';
import Stocks from '../pages/Stocks';


// const Home = lazy(() => import('../Home'));
// const Stocks = lazy(() => import('../Stocks'));


export default function BasicExample() {

    return (
        <Router>
        <div>
            <Routes />
        </div>
        </Router>
    );
}


const Routes = () => {
    const auth = Cookies.get('authentication');
    
    return(
        <Switch>
            <ProtectedLogin exact path='/login' auth={auth} component={Login} />
            <ProtectedRoute exact path='/stocks' auth={auth} component={Stocks} />
            <ProtectedRoute exact path='/' auth={auth} component={Home} />
        </Switch>
    )
}


const ProtectedRoute = ({auth, component:Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={(props) => auth ?
                <Component {...props} /> :
                <Redirect to='/login' />
            }
        />
    )
}


const ProtectedLogin = ({auth, component:Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={(props) => auth ?
                <Redirect to='/' /> :
                <Component {...props} />
            }
        />
    )
}