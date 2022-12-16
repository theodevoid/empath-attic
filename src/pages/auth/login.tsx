import { Stack, Title, Button } from "@mantine/core";
import FullPage from "components/layout/FullPage";
import type { NextPage } from "next";
import type { BuiltInProviderType } from "next-auth/providers";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

type LoginProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};

const Login: NextPage<LoginProps> = ({ providers }) => {
  const { data } = useSession();
  const router = useRouter();

  if (data?.user) {
    router.replace("/");
  }

  return (
    <FullPage>
      <Stack sx={{ justifyContent: "center", height: "100%" }}>
        <Title>Login Page</Title>
        <Button
          color="dark"
          variant="outline"
          onClick={() => signIn("google")}
        >
          Sign In with Google
        </Button>
      </Stack>
    </FullPage>
  );
};

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  console.log("CONTEXT", providers);

  return {
    props: {
      providers,
    },
  };
}

export default Login;
