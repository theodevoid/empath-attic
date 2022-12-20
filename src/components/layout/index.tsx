import type { ReactNode } from "react";
import BottomNavigationBar from "components/navigation/BottomNavigationBar";
import { Container, Box, Flex } from "@mantine/core";
import TopNavigationBar from "components/navigation/TopNavigationBar";
import { BAR_HEIGHT } from "constants/styles";

type LayoutProps = {
  children: ReactNode;
  withTopBar?: boolean;
  withBottomBar?: boolean;
  topBar?: ReactNode;
  bottomBar?: ReactNode;
};

const Layout = ({
  children,
  bottomBar,
  topBar,
  withBottomBar = true,
  withTopBar = true,
}: LayoutProps) => {
  const renderTopBar = () => {
    if (withTopBar) {
      if (!topBar) {
        return <TopNavigationBar />;
      }

      return topBar;
    }
  };

  const renderBottomBar = () => {
    if (withBottomBar) {
      if (!bottomBar) {
        return <BottomNavigationBar />;
      }

      return bottomBar;
    }
  };

  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0 }}>
        {renderTopBar()}
      </Box>
      <Box
        bg="gray.0"
        pt={withTopBar ? BAR_HEIGHT : 0}
        pb={withBottomBar ? BAR_HEIGHT : 0}
        sx={{ minHeight: "100vh" }}
      >
        <Container
          p={0}
          size="xs"
          bg="white"
          sx={{ minHeight: "100vh" }}
        >
          {children}
        </Container>
      </Box>
      <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        {renderBottomBar()}
      </Box>
    </Flex>
  );
};

export default Layout;
