
import Header from "../Components/Header/Header.component";
import { AdminAccess } from "../Dashboards/Private";



const AdminDashboardLayout = ({children}) => {
    return (
        <AdminAccess>
            <Header />
            {children}
        </AdminAccess>

    );
}

export default AdminDashboardLayout;