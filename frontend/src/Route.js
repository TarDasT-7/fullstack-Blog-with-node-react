import { Routes, Route } from "react-router-dom"

import Register from './Components/Register/Register.component'
import Login from './Components/Login/Login.component'
import Home from "./Pages/Home"

export const RouteAPI = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )

}
