import { Stack, Title, Button } from "@mantine/core";
import Layout from "components/layout";
import FullPage from "components/layout/FullPage";
import type { NextPage } from "next";
import type { BuiltInProviderType } from "next-auth/providers";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";

type LoginProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};

const Login: NextPage<LoginProps> = () => {
  const { data } = useSession();
  const router = useRouter();

  if (data?.user) {
    router.replace("/");
  }

  return (
    <Layout>
      <FullPage>
        <Stack
          sx={{ justifyContent: "center", height: "100%" }}
          px="xl"
        >
          <Button
            color="dark"
            variant="outline"
            onClick={() => signIn("google")}
            leftIcon={<FcGoogle size={20} />}
          >
            Sign In with Google
          </Button>
        </Stack>
      </FullPage>
    </Layout>
  );
};

export default Login;
