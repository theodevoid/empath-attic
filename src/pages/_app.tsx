import type { AppContext, AppType } from "next/app";
import NextApp from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

// disabled tailwind, caused issues with mantine
import "../styles/globals.css";

import { MantineProvider } from "@mantine/core";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
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
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);

  return {
    ...appProps,
    session: null,
  };
};

export default trpc.withTRPC(MyApp);
