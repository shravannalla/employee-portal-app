import { Box, styled } from "@mui/material";

const ContentWrapper = styled(Box)({
  top: "50%",
  left: "50%",
  bgcolor: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  sx: { transform: "translate(-50%, -50%)", position: "absolute" },
  width: "26rem",
});

const Container = styled(Box)({
    padding: "20px",
    width: "50%"
})

const LoginTemplate = ({ content }: any) => {
  return (
    <Container>
      <ContentWrapper>{content}</ContentWrapper>
    </Container>
  );
};
export default LoginTemplate;
