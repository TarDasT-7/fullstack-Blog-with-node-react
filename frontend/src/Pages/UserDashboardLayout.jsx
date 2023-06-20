import Header from "../Components/Header/Header.component";
import { MemberAccess } from "../Dashboards/Private";



const UserDashboardLayout = ({children}) => {
    return (
        <MemberAccess>
            <Header />
            {children}
        </MemberAccess>

    );
}

export default UserDashboardLayout;