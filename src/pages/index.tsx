import { Alert, Box, Title } from "@mantine/core";
import Campaign from "components/campaign/Campaign";
import { type NextPage } from "next";
import Head from "next/head";
import moment from "moment";

import { trpc } from "../utils/trpc";
import Layout from "components/layout";

const Home: NextPage = () => {
  const { data: campaigns } = trpc.campaign.getAll.useQuery();

  const renderCampaigns = () => {
    if (!campaigns?.length) {
      return (
        <Alert
          title="Wah!"
          color="yellow"
          my="md"
        >
          Saat ini belum ada penggalangan dana yang tersedia!
        </Alert>
      );
    }

    return campaigns?.map(campaign => {
      return (
        <Box
          mt="md"
          key={campaign.id.toString()}
        >
          <Campaign
            endDate={moment(campaign.end_date)}
            accuAmount={campaign.total_accumulated}
            targetAmount={campaign.target_amount}
            title={campaign.name}
            id={campaign.id}
            shortDescription={campaign.short_description}
            imageUrl={campaign.images[0] as string}
            slug={campaign.slug}
            category={campaign.category.name}
          />
        </Box>
      );
    });
  };

  return (
    <Layout>
      <Box
        py="md"
        px="sm"
      >
        <Head>
          <title>EmpathAttic</title>
          <meta
            name="description"
            content="Generated by create-t3-app"
          />
          <link
            rel="icon"
            href="/favicon.ico"
          />
        </Head>
        <Title order={3}>Penggalangan dana berlangsung</Title>
        {renderCampaigns()}
      </Box>
    </Layout>
  );
};

export default Home;
