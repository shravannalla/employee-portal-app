import EmployeeManager from "../../organisms/EmployeeManager";
import { HomePageTemplate } from "../../templates/HomePage";

interface EmployeeManagementProps {
  handleLogout: () => void;
}

const EmployeeManagement = ({ handleLogout }: EmployeeManagementProps) => {
  return (
    <HomePageTemplate
      content={<EmployeeManager />}
      handleLogout={handleLogout}
    />
  );
};

export default EmployeeManagement;