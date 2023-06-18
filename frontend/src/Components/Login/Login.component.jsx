import { useRef, useState } from 'react';
import { Link } from "react-router-dom"
import classes from './Login.module.scss'

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [emailErr, setEmailErr] = useState(null);
    const [passwordErr, setPasswordErr] = useState(null);
    const walpaper = process.env.PUBLIC_URL + '/wallpaper/starry1.jpg'


    const formHandler = (event) => {
        event.preventDefault();

        const information = {
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
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



        // console.table({information})
    }


    return (
        <div className={classes.form_box} style={{ backgroundImage: `url(${walpaper})` }}>
            <div className={classes.form_header}>
                <h1>Login</h1>
            </div>
            <div className={classes.form_body}>
                <form onSubmit={formHandler}>
                    <label htmlFor="email">Email</label>
                    {emailErr ?<span className={classes.validatioErr}>{emailErr}</span>:''}
                    <input ref={emailRef} name="email" type="text" placeholder="enter email" />

                    <label htmlFor="password">Password</label>
                    {passwordErr ?<span className={classes.validatioErr}>{passwordErr}</span>:''}
                    <input ref={passwordRef} name="password" type="password" placeholder="enter password" />

                    <button>Login</button>
                </form>
            </div>
            <div className={classes.form_footer}>
                <span>Have you not created an account yet? <Link to="/register">Register</Link></span>
            </div>

        </div>
    );
}

export default Login;