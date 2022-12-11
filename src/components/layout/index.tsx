import type { ReactNode } from "react";
import BottomNavigationBar from "components/navigation/BottomNavigationBar";
import { Container } from "@mantine/core";
import { Flex } from "@mantine/core";
import { Box } from "@mantine/core";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box bg="gray.0">
      <Container
        size="xs"
        bg="white"
      >
        <Flex
          direction="column"
          h="100vh"
          justify="center"
        >
          <Box sx={{ flex: 1 }}>{children}</Box>
          <BottomNavigationBar />
        </Flex>
      </Container>
    </Box>
  );
};

export default Layout;
