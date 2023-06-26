import React,{ Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HandleResponse, isAuth } from "../Actions/Auth";



const DashboardHandler = (role) => {
    switch (role) {
        case 0:
            return '/user'
        case 1:
            return '/admin'
        default:
            return '/'
    }
}

export const MemberAccess = ({ children }) => {
    const history = useNavigate();

    useEffect(() => {
        if (!isAuth()) {
            history('/login')

        } else if (isAuth().role !== 0) {
            history(DashboardHandler(isAuth().role))
        }
    }, [history]);

    return <Fragment> {children} </Fragment>
}

export const AdminAccess = ({ children }) => {

    const history = useNavigate();

    useEffect(() => {
        if (!isAuth()) {
            history('/login')
        } else if (isAuth().role !== 1) {
            history(DashboardHandler(isAuth().role))
        }
    }, [history]);

    return <Fragment> {children} </Fragment>
}