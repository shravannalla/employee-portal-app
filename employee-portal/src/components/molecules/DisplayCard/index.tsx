import { Box, Grid, styled, Typography } from "@mui/material";
import { type ReactNode } from "react";

interface DisplayCardProps {
  title: string;
  content: ReactNode;
}

const Container = styled(Box)({
  borderRadius: "12px",
  padding: "16px",
  backgroundColor: "#424242",
  height: "24rem",
  width: "30rem",
});

const DisplayCard = ({ title, content }: DisplayCardProps) => {
  return (
    <>
      <Container>
        <Grid container display={"flex"} flexDirection={"column"} gap={2}>
          <Grid item>
            <Typography children={title} variant="h5" />
          </Grid>
          <Grid item>{content}</Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DisplayCard;
