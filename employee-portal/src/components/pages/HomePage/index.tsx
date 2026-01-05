import Banner from "../../organisms/Banner";
import { HomePageTemplate } from "../../templates/HomePage";

interface HomePageProps {
    handleLogout: () => void;
}

const HomePage = ({ handleLogout }: HomePageProps) => {
  return (
    <HomePageTemplate
      content={<Banner />}
      handleLogout={handleLogout}
    />
  );
};

export default HomePage;