import { Button, Grid, Typography } from "@mui/material";
import { InputField } from "../../molecules/TextInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginToEmployeePortal } from "../../../utils/api";
import { EMAIL_REQUIRED, LOGGING_IN, LOGIN, LOGIN_FAILED, PASSWORD_REQUIRED, VALID_EMAIL } from "../../../utils/constants";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError(EMAIL_REQUIRED);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(VALID_EMAIL);
      return;
    }

    if (!password) {
      setPasswordError(PASSWORD_REQUIRED);
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginToEmployeePortal(email, password);
      if (response.status === 200) {
        setEmail("");
        setPassword("");
        onLoginSuccess();
        navigate("/employee-management");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || LOGIN_FAILED;
      setPasswordError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    inputField: {
      width: "26.5rem",
    },
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" color={"primary"}>
            {LOGIN}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <InputField
            variant="outlined"
            placeholder="Email"
            type="email"
            value={email}
            color="info"
            styles={styles.inputField}
            error={emailError}
            handleChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            variant="outlined"
            placeholder="Password"
            type="password"
            styles={styles.inputField}
            value={password}
            error={passwordError}
            handleChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} mt={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? LOGGING_IN : LOGIN}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginForm;
