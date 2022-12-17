import { Alert, Box } from "@mantine/core";
import Campaign from "components/campaign/Campaign";
import { type NextPage } from "next";
import Head from "next/head";
import moment from "moment";

import { trpc } from "../utils/trpc";

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
    <Box py="md">
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
      {renderCampaigns()}
      <Campaign
        slug={"testing-slug"}
        endDate={moment("2022-12-")}
        accuAmount={500_000}
        targetAmount={1_000_000}
        title="Bantu para penerus bangsa melanjutkan pendidikan"
        id={1}
        shortDescription="This is a short description. Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, est nostrum sit harum nobis inventore explicabo reprehenderit rerum amet incidunt!"
        imageUrl="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
      />
    </Box>
  );
};

export default Home;
