import LoginForm from "../../organisms/LoginForm";
import LoginTemplate from "../../templates/LoginTemplate";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  return (
    <>
      <LoginTemplate content={<LoginForm onLoginSuccess={onLoginSuccess} />} />
    </>
  );
};

export default LoginPage;

