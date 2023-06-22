import AdminHeader from "../Components/Header/Admin/Header.component";
import { AdminAccess } from "../Dashboards/Private";


const AdminDashboardLayout = ({children}) => {
    return (
        <AdminAccess>
            <AdminHeader />
            {children}
        </AdminAccess>

    );
}

export default AdminDashboardLayout;