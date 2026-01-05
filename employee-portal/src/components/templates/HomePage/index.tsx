// import { Box, Grid } from "@mui/material";
// import type { ReactNode } from "react";

// type Props = {
//   header: ReactNode;
//   content: ReactNode;
// };

// export const HomePageTemplate = ({ header, content }: Props) => {
//   return (
//     <Grid container direction="column" sx={{ minHeight: "100vh" }} gap={4}>
//       <Grid item xs={12} height={"10vh"}>
//         <Box
//           component="header"
//           sx={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}
//         >
//           {header}
//         </Box>
//       </Grid>

//       <Grid item sx={{
//           flexGrow: 1,
//           overflow: 'auto',
//         }} bgcolor={"#f1f3f0ff"} borderRadius={"8px"} padding={"16px"}>
//         <Grid container>
//           <Grid item xs>
//             {content}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default HomePageTemplate;

import { Box, Grid } from "@mui/material";
import Header from "../../organisms/Header";
import { DASHBOARD, MANAGE_EMPLOYEES } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  content: ReactNode;
  handleLogout: () => void;
};

export const HomePageTemplate = ({ content, handleLogout }: Props) => {
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate("/");
  };

  const handleNavigateToManageScreen = () => {
    navigate("/employeeManagement");
  };

  return (
    <Grid container direction="column" sx={{ minHeight: "100vh" }} gap={4}>
      <Grid item xs={12} height={"10vh"}>
        <Box
          component="header"
        >
          <Header
            primaryButtonText={DASHBOARD}
            secondaryButtonText={MANAGE_EMPLOYEES}
            handlePrimaryBtnClick={handleNavigateToDashboard}
            handleSecondaryBtnClick={handleNavigateToManageScreen}
            handleLogout={handleLogout}
          />
        </Box>
      </Grid>

      <Grid item sx={{
          flexGrow: 1,
          overflow: 'auto',
        }} bgcolor={"#f1f3f0ff"} borderRadius={"8px"} padding={"16px"}>
        <Grid container>
          <Grid item xs>
            {content}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};