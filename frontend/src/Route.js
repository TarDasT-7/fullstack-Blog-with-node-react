import { Routes, Route, Navigate } from "react-router-dom"

import Register from './Components/Register/Register.component'
import Login from './Components/Login/Login.component'
import Home from "./Pages/Home"
import { isAuth } from "./Actions/Auth"

import UserDashboardLayout from "./Pages/UserDashboardLayout"
import AdminDashboardLayout from "./Pages/AdminDashboardLayout"
import Layout from "./Pages/Layout"


export const RouteAPI = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />

                <Route path="/register" element={isAuth() ? <Navigate to="/" replace /> : <Layout> <Register /> </Layout>} />
                <Route path="/login" element={isAuth() ? <Navigate to="/" replace /> : <Layout> <Login /> </Layout>} />


                <Route path="/user" element={<UserDashboardLayout> <h1> user </h1> </UserDashboardLayout>} />
                <Route path="/admin" element={<AdminDashboardLayout> <h1> admin </h1> </AdminDashboardLayout>} />

            </Routes>

        </>


    )

}
