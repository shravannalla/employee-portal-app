import HomePageTemplate from "../../templates/HomePage";
import Header from "../../organisms/Header";
import EmployeeManager from "../../organisms/EmployeeManager";
import { useNavigate } from "react-router-dom";
import { DASHBOARD, MANAGE_EMPLOYEES } from "../../../utils/constants";

interface EmployeeManagementProps {
  handleLogout: () => void;
}

const EmployeeManagement = ({ handleLogout }: EmployeeManagementProps) => {
  const navigate = useNavigate();

  const handleNavigateToManageScreen = () => {
    navigate("/employeeManagement");
  };

  const handleNavigateToDashboard = () => {
    navigate("/");
  };
  return (
    <>
      <HomePageTemplate
        content={<EmployeeManager />}
        header={
          <Header
            primaryButtonText={DASHBOARD}
            secondaryButtonText={MANAGE_EMPLOYEES}
            handlePrimaryBtnClick={handleNavigateToDashboard}
            handleSecondaryBtnClick={handleNavigateToManageScreen}
            handleLogout={handleLogout}
          />
        }
      />
    </>
  );
};

export default EmployeeManagement;
