import { Box, Title, Button, Flex } from "@mantine/core";
import FullPage from "components/layout/FullPage";
import type { NextPage } from "next";
import Link from "next/link";

const UnauthedState: NextPage = () => {
  return (
    <FullPage>
      <Flex
        sx={{
          height: "100%",
          justifyContent: "center",
          // alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Title
          align="center"
          order={2}
          weight="normal"
        >
          Yuk login untuk membuka bantuan lebih besar lagi
        </Title>
        <Box
          mt="md"
          sx={{ textAlign: "center" }}
        >
          <Link href="/auth/login">
            <Button
              size="lg"
              variant="filled"
              w="80%"
            >
              Login
            </Button>
          </Link>
        </Box>
      </Flex>
    </FullPage>
  );
};

export default UnauthedState;
