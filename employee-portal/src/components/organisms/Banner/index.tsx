import { Grid, styled, Typography } from "@mui/material";
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

const Banner = () => {
  const [employees, setEmployees] = React.useState([]);
  const [recentEmployees, setRecentEmployees] = React.useState([]);

  useEffect(() => {
    getEmployees().then((data) => {
      setEmployees(data!);
      const recent = data ? [...data].reverse().slice(0, 5) : [];
      setRecentEmployees(recent);
    });
  }, []);

  return (
    <>
      <Container container display={"flex"} flexDirection={"row"}>
        <Grid item>
          <DisplayCard
            title={EMPLOYEE_COUNT}
            content={
              <Typography
                children={employees.length}
                variant="h1"
                sx={{ paddingTop: "36px" }}
              />
            }
          />
        </Grid>
        <Grid item>
          <DisplayCard
            title={RECENT_EMPLOYEES}
            content={<ListContainer list={recentEmployees} />}
          />
        </Grid>
      </Container>
    </>
  );
};

export default Banner;
