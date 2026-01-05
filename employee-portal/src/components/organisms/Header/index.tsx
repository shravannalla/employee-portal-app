import { Button, Grid } from "@mui/material";
import { LOGOUT } from "../../../utils/constants";

interface HeaderProps {
  primaryButtonText: String;
  secondaryButtonText: String;
  handlePrimaryBtnClick: () => void;
  handleSecondaryBtnClick: () => void;
  handleLogout: () => void;
}

const Header = ({
  primaryButtonText,
  secondaryButtonText,
  handlePrimaryBtnClick,
  handleSecondaryBtnClick,
  handleLogout,
}: HeaderProps) => {
  return (
    <>
      <Grid container spacing={2} justifyContent={"space-between"}>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePrimaryBtnClick}
              >
                {primaryButtonText}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSecondaryBtnClick}
              >
                {secondaryButtonText}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            {LOGOUT}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
