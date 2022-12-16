import { Box, Title, Button, Avatar, Flex, Text } from "@mantine/core";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

const LoggedInState: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <Box>
      <Title
        order={4}
        align="center"
        mb="xl"
        pt="xl"
      >
        My Profile
      </Title>
      <Flex sx={{ alignItems: "center", justifyContent: "center" }}>
        <Avatar
          size="xl"
          sx={{ borderRadius: "50%" }}
          src={sessionData?.user?.image}
          color="primary"
        >
          T
        </Avatar>
        <Box ml="md">
          <Title order={2}>{sessionData?.user?.name}</Title>
          <Text color="dimmed">{sessionData?.user?.email}</Text>
        </Box>
      </Flex>
      <Box
        mt="lg"
        sx={{ textAlign: "center" }}
      >
        <Button
          w="60%"
          color="red"
          variant="outline"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default LoggedInState;
