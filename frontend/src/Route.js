import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import nprogress from "nprogress";
import { useEffect } from "react";

import Register from './Components/Register/Register.component'
import Login from './Components/Login/Login.component'
import Home from "./Pages/Home"
import { isAuth } from "./Actions/Auth"

import UserDashboardLayout from "./Pages/UserDashboardLayout"
import AdminDashboardLayout from "./Pages/AdminDashboardLayout"
import Layout from "./Pages/Layout"
import { AdminIndexDashboard } from "./Dashboards/IndexDashboard";
import { IndexCategory } from "./Components/CRUD/Categories/Category.component";

export const RouteAPI = () => {

    let location = useLocation();
    useEffect(() => {
        nprogress.configure({
            speed: 700,

        });
        nprogress.start();
        nprogress.done();
    }, [location.pathname]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />

                <Route path="/register" element={isAuth() ? <Navigate to="/" replace /> : <Layout> <Register /> </Layout>} />
                <Route path="/login" element={isAuth() ? <Navigate to="/" replace /> : <Layout> <Login /> </Layout>} />


                <Route path="/admin" element={<AdminDashboardLayout> <AdminIndexDashboard /> </AdminDashboardLayout>} />
                <Route path="/admin/categories" element={<AdminDashboardLayout> <IndexCategory /> </AdminDashboardLayout>} />

                {/* <Route path="/user" element={<UserDashboardLayout> <h1> user </h1> </UserDashboardLayout>} /> */}

            </Routes>

        </>


    )

}
