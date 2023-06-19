import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import classes from './Login.module.scss'
import { login } from '../../Actions/Auth';
import { LoadingComponent } from '../Loading/Loading.component';


const Login = () => {

    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailErr, setEmailErr] = useState(null);
    const [passwordErr, setPasswordErr] = useState(null);

    const [isLoadPage, setIsLoadPage] = useState(false);
    const [actionResult, setActionResult] = useState({ success: null, message: '' });

    const walpaper = process.env.PUBLIC_URL + '/wallpaper/starry1.jpg'


    const formHandler = (event) => {
        event.preventDefault();
        setIsLoadPage(true);
        setActionResult({ success: null, message: '' })


        if (email.trim().length === 0) {
            setEmailErr('email is required')
            setIsLoadPage(false);
            return;

        } else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email)) {
            setEmailErr('email is not invalid')
            setIsLoadPage(false);
            return;

        } else {
            setEmailErr(null)
        }

        if (password.trim().length < 8 || password.trim().length > 16) {
            setPasswordErr('password must be between 6 and 18 charecter')
            setIsLoadPage(false);
            return;

        } else {
            setPasswordErr(null)
        }

        const user = { email, password }

        login(user).then(data => {
            setIsLoadPage(false);
            if (data.error) {

                return setActionResult({
                    success: false,
                    message: data.error
                })
            } else {
                history('/');
            }
        })

    }


    return (
        isLoadPage === false
            ?
            <div className={classes.form_box} style={{ backgroundImage: `url(${walpaper})` }}>

                <div className={classes.form_header}>
                    <h1>Login</h1>
                </div>

                <div className={classes.form_body}>

                    <form onSubmit={formHandler}>

                        <label htmlFor="email">Email</label>
                        {emailErr ? <span className={classes.validatioErr}>{emailErr}</span> : ''}
                        <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" placeholder="enter email" />

                        <label htmlFor="password">Password</label>
                        {passwordErr ? <span className={classes.validatioErr}>{passwordErr}</span> : ''}
                        <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="enter password" />

                        <button>Login</button>
                        {
                            actionResult.success === false
                                ? <span className={classes.result_action_error}> {actionResult.message} </span>
                                : ''
                        }

                    </form>

                </div>
                <div className={classes.form_footer}>
                    <span>Have you not created an account yet? <Link to="/register">Register</Link></span>
                </div>

            </div>
            :
            <LoadingComponent />

    );
}

export default Login;