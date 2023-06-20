import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../Actions/Auth";


const DashboardHandler = (role) => {
    switch (role) {
        case 0:
            return '/user'
        case 1:
            return '/admin'
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
    }, []);

    return <> {children} </>
}

export const AdminAccess = ({ children }) => {

    const history = useNavigate();

    useEffect(() => {
        if (!isAuth()) {
            history('/login')
        } else if (isAuth().role !== 1) {
            history(DashboardHandler(isAuth().role))
        }
    }, []);

    return <> {children} </>
}