import type { ReactNode } from "react";
import BottomNavigationBar from "components/navigation/BottomNavigationBar";
import { Container, ScrollArea, Flex, Box } from "@mantine/core";
import TopNavigationBar from "components/navigation/TopNavigationBar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <ScrollArea
      h="100vh"
      pos="relative"
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <TopNavigationBar />
      </Box>
      <Box
        bg="gray.0"
        sx={{ width: "100vw" }}
      >
        <Container
          size="xs"
          bg="white"
          py="65px"
        >
          {children}
        </Container>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BottomNavigationBar />
      </Box>
    </ScrollArea>
  );
};

export default Layout;
