import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

// disabled tailwind, caused issues with mantine
// import "../styles/globals.css";
import Layout from "../components/layout";

import { MantineProvider } from "@mantine/core";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          colors: {
            primary: [
              "#EAF3FA",
              "#C5DCF2",
              "#9FC6E9",
              "#7AAFE1",
              "#5599D8",
              "#2F83D0",
              "#2668A6",
              "#1C4E7D",
              "#133453",
            ],
          },
          primaryColor: "primary",
          primaryShade: 5,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
