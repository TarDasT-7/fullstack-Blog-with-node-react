import React,{ Fragment } from "react";
import Footer from "../Components/Footer/Footer.component";
import Header from "../Components/Header/Header.component";




const Layout = ({children}) => {
    return (
        <Fragment>
            <Header />
            {children}
            {/* <Footer /> */}
        </Fragment>

    );
}

export default Layout;