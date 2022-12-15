import type { ReactNode } from "react";
import BottomNavigationBar from "components/navigation/BottomNavigationBar";
import { Container, ScrollArea, Flex, Box } from "@mantine/core";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <ScrollArea style={{ height: "100vh" }}>
      <Box
        bg="gray.0"
        sx={{ width: "100vw" }}
      >
        <Container
          size="xs"
          bg="white"
        >
          <Flex
            direction="column"
            mih="100vh"
            justify="center"
            pos="relative"
          >
            <Box sx={{ flex: 1 }}>{children}</Box>
            <Box
              sx={{
                position: "sticky",
                bottom: 0,
                zIndex: 2,
              }}
            >
              <BottomNavigationBar />
            </Box>
          </Flex>
        </Container>
      </Box>
    </ScrollArea>
  );
};

export default Layout;
