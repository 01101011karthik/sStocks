import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logUser } from '../store/user/actions';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../components/Loading';

const useStyles = makeStyles((theam) => ({
    inputMarginTop: {
        marginTop: '30px'
    },
    pageButton: {
        background: 'linear-gradient(45deg, #0270e1 30%, #399bff 90%)',
        color: 'white',
        width: '40%',
        textAlign: 'right',
        position: 'absolute',
        bottom: '-20%',
        right: '0%',
    }
}))


function Login(props) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [ email, setEmail ] = useState('');
    const [ name, setName ] = useState('')
    const [ password, setPassword] = useState('');
    const [ isCreating, setIsCreating ] = useState(false);


    const user = useSelector(state => state.user)
    let { errorMessage, loading, payload:response } = user;

    useEffect(() => {
        if(response && response.message && response.message === 'success'){
            if(!localStorage.getItem('source_type') && !localStorage.getItem('sort_order')){
                localStorage.setItem('source_type', 'USD')
                localStorage.setItem('sort_order', 'desc')
            }
            window.location.reload();
        }
    }, [response])

    const handleChange = (e, taget) => {
        const value = e.currentTarget.value;
        if(taget === 'email') setEmail(value)
        else if(taget === 'pass') setPassword(value)
        else setName(value)
    }

    const handleCreate = () => {
        setAllEmpty()
        user.errorMessage = '';
        isCreating ? setIsCreating(false) : setIsCreating(true)
    }

    const handleRegisteration = async () => {
        const payload = {email, name, password};
        dispatch(logUser('register', payload));
        setAllEmpty()
    }

    const handleLogin = async () => {
        const payload = {email, password}
        dispatch(logUser('login', payload))
        setAllEmpty()
    }

    function setAllEmpty(){
        setEmail('')
        setPassword('')
        setName('')
    }


    return (
        <>
            <div className="inputs-container">
                {
                    errorMessage ?
                    <p className='login-error-message'>{errorMessage}</p> : null
                }
                {
                    isCreating ?
                    <TextField value={name} label="Name" onChange={(e) => handleChange(e,'name')}/> : null
                }
                <TextField value={email} className={isCreating ? classes.inputMarginTop : ''}  label="Email" onChange={(e) => handleChange(e,'email')}/>
                <TextField value={password} className={classes.inputMarginTop} label="Password" type="password" onChange={(e) => handleChange(e, 'pass')}/>
                <p className="create-account-text" onClick={handleCreate}>
                    {
                        isCreating ? 
                        'Already have an account?' : 'No account?'
                    }  
                    <span className="custom-link-like">
                        {
                            isCreating ? 
                            ' Login' : ' Create One'
                        }
                    </span>
                </p>
                <div style={{position: 'relative', marginTop: '40px'}}>
                    {
                        isCreating ?
                            <Button className={classes.pageButton} variant="contained" onClick={handleRegisteration}>Register</Button> :
                            <Button className={classes.pageButton} variant="contained" onClick={handleLogin}>Login</Button>
                    }
                </div>
            </div>
            <div className="login-loading-container">
                {
                    loading ? 
                        <Loading /> :
                        null
                }
            </div>
        </>
    );
}

export default Login;