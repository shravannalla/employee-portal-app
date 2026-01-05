import { Box, Grid } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  header: ReactNode;
  content: ReactNode;
};

export const HomePageTemplate = ({ header, content }: Props) => {
  return (
    <Grid container direction="column" sx={{ minHeight: "100vh" }} gap={4}>
      <Grid item xs={12} height={"10vh"}>
        <Box
          component="header"
          sx={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}
        >
          {header}
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

export default HomePageTemplate;
