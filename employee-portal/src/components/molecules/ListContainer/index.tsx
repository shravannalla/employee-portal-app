import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";

interface ListContainerProps {
  list: Record<string, any>[];
}

const TextWrapper = styled(Grid)({
  bgcolor: "#252925",
  borderRadius: "8px",
  padding: "8px",
});

const ListContainer = ({ list }: ListContainerProps) => {
  return (
    <>
      <Grid container display={"flex"} flexDirection={"column"} gap={1}>
        {list &&
          list.map((item, index) => (
            <TextWrapper item key={index}>
              <Typography children={item.name} variant="h6" />
            </TextWrapper>
          ))}
      </Grid>
    </>
  );
};

export default ListContainer;
