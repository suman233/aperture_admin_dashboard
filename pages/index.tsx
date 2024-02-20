import Wrapper from "@/layout/wrapper/Wrapper";
import styles from "@/styles/pages/home.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Home() {
  return (
    <Wrapper>
      <Box className={styles.home}>
       
        <Container fixed>
          <h1>Home page</h1>
        </Container>
      </Box>
    </Wrapper>
  );
}
