import Footer from "../Components/Footer/Footer.component";
import Header from "../Components/Header/Header.component";


const Layout = ({children}) => {
    return (
        <>
            <Header />
            {children}
            {/* <Footer /> */}
        </>

    );
}

export default Layout;