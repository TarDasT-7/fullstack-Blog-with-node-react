
import { useRef, useState } from 'react';
import { Link } from "react-router-dom"
import classes from './Register.module.scss'

const Register = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmedPasswordRef = useRef();
    const [nameErr, setNameErr] = useState(null);
    const [emailErr, setEmailErr] = useState(null);
    const [passwordErr, setPasswordErr] = useState(null);
    const [confirmedErr, setConfirmedErr] = useState(null);
    const walpaper = process.env.PUBLIC_URL + '/wallpaper/starry1.jpg'


    const formHandler = (event) => {
        event.preventDefault();

        const information = {
            'name': nameRef.current.value,
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
            'confirmed_password': confirmedPasswordRef.current.value,
        }

        if (information.name.trim().length === 0) {
            setNameErr('name is required')
            return;

        } else if (information.name.trim().length < 4 || information.name.trim().length > 30) {
            setNameErr('name must be between 4 and 30 charecter')
            return;

        } else {
            setNameErr(false)
        }

        if (information.email.trim().length === 0) {
            setEmailErr('email is required')
            return;
        } else {
            if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(information.email)) {
                setEmailErr('email is not invalid')
                return;

            } else {
                setEmailErr(null)
            }
        }

        if (information.password.trim().length < 8 || information.password.trim().length > 16) {
            setPasswordErr('password must be between 6 and 18 charecter')
            return;
        } else {
            setPasswordErr(null)
        }

        if (information.password.trim() !== information.confirmed_password.trim()) {
            setConfirmedErr('repet password is not same password')
            return
        } else {
            setConfirmedErr(null)
        }


    }


    return (
        <div className={classes.form_box} style={{ backgroundImage: `url(${walpaper})` }}>
            <div className={classes.form_header}>
                <h1>Register</h1>
            </div>
            <div className={classes.form_body}>
                <form onSubmit={formHandler}>

                    <label htmlFor="name">Name</label>
                    {nameErr ?<span className={classes.validatioErr}>{nameErr}</span>:''}
                    <input ref={nameRef} name="name" type="text" placeholder="enter name" />

                    <label htmlFor="email">Email</label>
                    {emailErr ?<span className={classes.validatioErr}>{emailErr}</span>:''}
                    <input ref={emailRef} name="email" type="text" placeholder="enter email" />

                    <label htmlFor="password">Password</label>
                    {passwordErr ?<span className={classes.validatioErr}>{passwordErr}</span>:''}
                    <input ref={passwordRef} name="password" type="password" placeholder="enter password" />

                    <label htmlFor="confirmed_password">Confirmed Password</label>
                    {confirmedErr ?<span className={classes.validatioErr}>{confirmedErr}</span>:''}
                    <input ref={confirmedPasswordRef} name="confirmed_password" type="password" placeholder="repet password" />

                    <button>Save</button>
                </form>
            </div>
            <div className={classes.form_footer}>
                <span>Have you already created an account? <Link to="/login">Login</Link></span>
            </div>

        </div>
    );


}

export default Register;