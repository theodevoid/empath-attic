import { Box, Title, Button, Avatar, Flex, Text } from "@mantine/core";
import LoggedInState from "components/pages/profile/LoggedInState";
import UnauthedState from "components/pages/profile/UnauthedState";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

const Profile: NextPage = () => {
  const { data: sessionData } = useSession();

  if (sessionData?.user) return <LoggedInState />;

  return <UnauthedState />;
};

export default Profile;
