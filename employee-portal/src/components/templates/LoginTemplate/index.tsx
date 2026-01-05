import { Box, styled } from "@mui/material";

const ContentWrapper = styled(Box)({
  top: "50%",
  left: "50%",

  padding: "20px",
  borderRadius: "8px",

  width: "26rem",
});

const Container = styled(Box)({
  padding: "20px",
  width: "50%",
});

const LoginTemplate = ({ content }: any) => {
  return (
    <Container>
      <ContentWrapper
        bgcolor={"#ffffff"}
        sx={{ transform: "translate(-50%, -50%)", position: "absolute" }}
      >
        {content}
      </ContentWrapper>
    </Container>
  );
};
export default LoginTemplate;
