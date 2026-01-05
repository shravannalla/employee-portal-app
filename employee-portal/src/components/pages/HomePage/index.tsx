import { useNavigate } from "react-router-dom";
import Banner from "../../organisms/Banner";
import Header from "../../organisms/Header";
import { HomePageTemplate } from "../../templates/HomePage";
import { DASHBOARD, MANAGE_EMPLOYEES } from "../../../utils/constants";

interface HomePageProps {
    handleLogout: () => void;
}

const HomePage = ({ handleLogout }: HomePageProps) => {
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
        content={<Banner />}
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

export default HomePage;
