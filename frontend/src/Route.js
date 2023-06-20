import { Routes, Route, Navigate } from "react-router-dom"

import Register from './Components/Register/Register.component'
import Login from './Components/Login/Login.component'
import Home from "./Pages/Home"
import { isAuth } from "./Actions/Auth"



export const RouteAPI = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={isAuth() ? <Navigate to="/" replace /> : <Register />} />
            <Route path="/login" element={isAuth() ? <Navigate to="/" replace /> : <Login />} />
        </Routes>
    )

}
