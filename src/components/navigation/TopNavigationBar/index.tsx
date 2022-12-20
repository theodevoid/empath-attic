import { Flex, Title, Input, Box, Container } from "@mantine/core";
import { BAR_HEIGHT } from "constants/styles";
import { MdSearch } from "react-icons/md";

const TopNavigationBar = () => {
  return (
    <Box
      py="md"
      bg="primary"
      h={BAR_HEIGHT}
    >
      <Container size="xs">
        <Flex align="center">
          <Title
            size="h3"
            mr="md"
            color="white"
          >
            Logo
          </Title>
          <Input
            width="100%"
            sx={{ flex: 1 }}
            icon={<MdSearch />}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default TopNavigationBar;
