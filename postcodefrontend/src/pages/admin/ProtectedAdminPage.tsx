import { withAuthCheck } from "../withAuthCheck";
import AdminPage from "./AdminPage";

const ProtectedAdminPage = () => {
    return withAuthCheck(AdminPage)
};

export default ProtectedAdminPage;