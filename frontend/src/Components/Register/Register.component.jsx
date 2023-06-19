import React, { useState } from 'react';
import { Link } from "react-router-dom"
import classes from './Register.module.scss'
import { register } from '../../Actions/Auth';
import { LoadingComponent } from '../Loading/Loading.component';


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const [nameErr, setNameErr] = useState(null);
    const [emailErr, setEmailErr] = useState(null);
    const [passwordErr, setPasswordErr] = useState(null);
    const [confirmedErr, setConfirmedErr] = useState(null);

    const [isLoadPage, setIsLoadPage] = useState(false);
    const [actionResult, setActionResult] = useState({ success: null, message: '' });

    const walpaper = process.env.PUBLIC_URL + '/wallpaper/starry1.jpg'



    const formHandler = (event) => {
        event.preventDefault();
        setIsLoadPage(true);
        setActionResult({ success: null, message: '' })


        if (name.trim().length === 0) {
            setNameErr('name is required')
            setIsLoadPage(false);
            return;

        } else if (name.trim().length < 4 || name.trim().length > 30) {
            setNameErr('name must be between 4 and 30 charecter')
            setIsLoadPage(false);
            return;

        } else {
            setNameErr(false)
        }

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

        if (password.trim() !== confirmedPassword.trim()) {
            setConfirmedErr('repet password is not same password')
            setIsLoadPage(false);
            return

        } else {
            setConfirmedErr(null)
        }

        const user = { name, email, password }

        register(user).then(data => {
            setIsLoadPage(false);
            if (data.error) {

                return setActionResult({
                    success: false,
                    message: data.error
                })
            } else {
                setName('')
                setEmail('')
                setPassword('')
                setConfirmedPassword('')

                return setActionResult({
                    success: true,
                    message: data.message
                })
            }
        })

        return
    }


    return (
        isLoadPage === false
            ?
            <div className={classes.form_box} style={{ backgroundImage: `url(${walpaper})` }}>

                <div className={`${classes.form_header} 
                    ${actionResult.success === true ? classes.result_action_seccess : null}`}>

                    {actionResult.success === true ? <h1>{actionResult.message}</h1> : <h1>Register</h1>}

                </div>

                <div className={classes.form_body}>

                    <form onSubmit={formHandler}>

                        <label htmlFor="name">Name</label>
                        {nameErr ? <span className={classes.validatioErr}>{nameErr}</span> : ''}
                        <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" placeholder="enter name" />

                        <label htmlFor="email">Email</label>
                        {emailErr ? <span className={classes.validatioErr}>{emailErr}</span> : ''}
                        <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" placeholder="enter email" />

                        <label htmlFor="password">Password</label>
                        {passwordErr ? <span className={classes.validatioErr}>{passwordErr}</span> : ''}
                        <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="enter password" />

                        <label htmlFor="confirmed_password">Confirmed Password</label>
                        {confirmedErr ? <span className={classes.validatioErr}>{confirmedErr}</span> : ''}
                        <input value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} name="confirmed_password" type="password" placeholder="repet password" />

                        <button>Save</button>
                        {
                            actionResult.success === false
                                ? <span className={classes.result_action_error}> {actionResult.message} </span>
                                : ''
                        }

                    </form>

                </div>

                <div className={classes.form_footer}>
                    <span>Have you already created an account? <Link to="/login">Login</Link></span>
                </div>

            </div>
            :
            <LoadingComponent />

    );


}

export default Register;