import type { ReactNode } from "react";
import BottomNavigationBar from "components/navigation/BottomNavigationBar";
import { Container, Box, Flex } from "@mantine/core";
import TopNavigationBar from "components/navigation/TopNavigationBar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0 }}>
        <TopNavigationBar />
      </Box>
      <Box
        bg="gray.0"
        py="65px"
        sx={{ minHeight: "100vh" }}
      >
        <Container
          size="xs"
          bg="white"
          sx={{ minHeight: "calc(100vh - 130px)" }}
        >
          {children}
        </Container>
      </Box>
      <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <BottomNavigationBar />
      </Box>
    </Flex>
  );
};

export default Layout;
