import { Box, Grid, Typography, IconButton, styled } from "@mui/material";

interface ListItemProps {
  title: string;
  infoIcon?: React.ReactNode;
  action1Icon?: React.ReactNode;
  action2Icon?: React.ReactNode;
  onAction1Click?: () => void;
  onAction2Click?: () => void;
}

const Wrapper = styled(Box)({
  padding: "4px 0px",
  width: "100%",
});

const Container = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  borderRadius: "12px",
  padding: "12px",
  gap: 12,
  justifyContent: "space-between",
  alignContent: "center",
  alignItems: "center",
});

const ListItem = ({
  title,
  infoIcon,
  action1Icon,
  action2Icon,
  onAction1Click,
  onAction2Click,
}: ListItemProps) => {
  return (
    <>
      <Wrapper padding={"4px 0px"} width={"100%"}>
        <Container container bgcolor="#456ab0">
          <Grid item>
            <Grid
              container
              display="flex"
              flexDirection="row"
              gap={6}
              alignItems={"center"}
            >
              <Grid item>{infoIcon}</Grid>
              <Grid item>
                <Typography variant="h6" children={title} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container display="flex" flexDirection="row" gap={2}>
              <Grid item>
                <IconButton size="small" onClick={onAction1Click}>
                  {action1Icon}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton size="small" onClick={onAction2Click}>
                  {action2Icon}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Wrapper>
    </>
  );
};

export default ListItem;
