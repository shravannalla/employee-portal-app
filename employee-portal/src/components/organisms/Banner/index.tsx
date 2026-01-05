import { CircularProgress, Grid, styled, Typography, Box } from "@mui/material";
import DisplayCard from "../../molecules/DisplayCard";
import ListContainer from "../../molecules/ListContainer";
import React, { useEffect } from "react";
import { getEmployees } from "../../../utils/api";
import { EMPLOYEE_COUNT, RECENT_EMPLOYEES } from "../../../utils/constants";

const Container = styled(Grid)({
  padding: "12px",
  borderRadius: "8px",
  gap: 2,
  height: "100%",
});

const LoaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  minHeight: "200px",
});

const Banner = () => {
  const [employees, setEmployees] = React.useState([]);
  const [recentEmployees, setRecentEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    getEmployees().then((data) => {
      setEmployees(data!);
      const recent = data ? [...data].reverse().slice(0, 5) : [];
      setRecentEmployees(recent);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Container container display={"flex"} flexDirection={"row"}>
        <Grid item>
          <DisplayCard
            title={EMPLOYEE_COUNT}
            content={
              loading ? (
                <LoaderContainer>
                  <CircularProgress />
                </LoaderContainer>
              ) : (
                <Typography
                  children={employees.length}
                  variant="h1"
                  sx={{ paddingTop: "36px" }}
                />
              )
            }
          />
        </Grid>
        <Grid item>
          <DisplayCard
            title={RECENT_EMPLOYEES}
            content={
              loading ? (
                <LoaderContainer>
                  <CircularProgress />
                </LoaderContainer>
              ) : (
                <ListContainer list={recentEmployees} />
              )
            }
          />
        </Grid>
      </Container>
    </>
  );
};

export default Banner;