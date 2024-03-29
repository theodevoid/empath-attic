import {
  Box,
  Image,
  Text,
  Progress,
  Badge,
  Avatar,
  Flex,
  Container,
  Button,
} from "@mantine/core";
import Layout from "components/layout";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdChevronLeft } from "react-icons/md";
import { prisma } from "server/db/client";
import type { Campaign, Category, User } from "@prisma/client";
import CampaignDetailsBottomBar from "components/campaign/CampaignDetailsBottomBar";
import Head from "next/head";
import { trpc } from "utils/trpc";
import DonationCard from "components/campaign/DonationCard";
import { useState, useEffect } from "react";

type CampaignDetailsProps = {
  campaignData: Campaign & {
    category: Category;
    user: User;
  };
};

const CampaignDetails = ({ campaignData }: CampaignDetailsProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [campaignDonations, setCampaignDonations] = useState<any[]>([]);

  const router = useRouter();
  const { slug } = router.query;

  const { data } = trpc.campaign.getCampaignById.useQuery(
    { id: campaignData.id },
    {
      enabled: false,
      refetchOnWindowFocus: true,
    },
  );

  const { data: getCampaignDonationsData, isFetching } =
    trpc.campaign.getCampaignDonations.useQuery(
      {
        campaignId: campaignData.id,
        page: currentPage,
      },
      {
        refetchOnWindowFocus: false,
      },
    );

  useEffect(() => {
    if (getCampaignDonationsData?.data.length) {
      setCampaignDonations(prevCampaignDonations => [
        ...prevCampaignDonations,
        ...getCampaignDonationsData?.data,
      ]);
    }
  }, [getCampaignDonationsData?.data]);

  const {
    id,
    category,
    name,
    short_description,
    total_accumulated,
    target_amount,
    user,
    funds_available,
  } = campaignData;

  const rendercampaignDonations = () => {
    return campaignDonations?.map(item => {
      return (
        <Box
          my={8}
          key={item.id}
        >
          <DonationCard
            amount={item?.amount}
            imageUrl={item?.user?.image as string}
            message={item?.message}
            username={item?.user?.name as string}
          />
        </Box>
      );
    });
  };

  return (
    <>
      <Head>
        <title>{campaignData.name}</title>
        <meta
          name="description"
          content={campaignData.short_description}
        />
      </Head>
      <Layout
        topBarHeight="48px"
        topBar={
          <Box
            h="48px"
            bg="primary"
          >
            <Container
              size="xs"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                height: "100%",
              }}
              px={40}
            >
              <Link
                href="/"
                style={{ height: "40px", position: "absolute", left: 0 }}
              >
                <MdChevronLeft
                  size="40px"
                  color="white"
                />
              </Link>
              <Text
                align="center"
                color="white"
                weight={500}
              >
                Tentang Penggalangan Dana
              </Text>
            </Container>
          </Box>
        }
        bottomBar={<CampaignDetailsBottomBar campaignId={id} />}
      >
        <Image
          styles={{
            imageWrapper: {
              position: "unset",
            },
          }}
          height={240}
          width="100%"
          alt={slug as string}
          src="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNjaG9vbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60"
        />
        <Box
          px="sm"
          mt="sm"
        >
          <Badge color="green">{category.name}</Badge>
          <Text
            size={22}
            weight="bold"
          >
            {name}
          </Text>
          <Text mt={4}>{short_description}</Text>
          <Progress
            value={
              target_amount ? (total_accumulated / target_amount) * 100 : 100
            }
            radius={0}
            mt="lg"
          />
          <Box mt="sm">
            {/* This is NOT the total accumulated, rather available funds */}
            <Text
              weight={600}
              size="xl"
              color="primary"
            >
              Rp.{" "}
              {data?.funds_available
                ? data?.funds_available.toLocaleString("id-ID")
                : funds_available.toLocaleString("id-ID")}
            </Text>
            <Text size="sm">
              Terkumpul dari{" "}
              <Text
                display="inline"
                weight={600}
              >
                Rp. {target_amount.toLocaleString("id-ID")}
              </Text>
            </Text>

            {/* If campaign has no target limit, show total accumulated */}
            {/* <Text size="sm">
            Total dana terkumpul sudah{" "}
            <Text
              display="inline"
              weight={600}
            >
              Rp. {(10_000_000).toLocaleString("id-ID")}
            </Text>
          </Text> */}
          </Box>
        </Box>
        <Box
          mt="md"
          sx={{
            borderTop: "1px solid lightgray",
            borderBottom: "1px solid lightgray",
          }}
          px={36}
          py={8}
        >
          <Flex justify="start">
            <Avatar
              size="lg"
              sx={{ borderRadius: "50%" }}
              src={user.image}
            >
              {user.name?.charAt(0)}
            </Avatar>
            <Flex
              direction="column"
              ml="lg"
              justify="center"
            >
              <Text
                size="sm"
                color="dimmed"
              >
                Penggalang dana
              </Text>
              <Text
                size="lg"
                weight={500}
              >
                {user.name}
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box
          px="sm"
          py="lg"
        >
          <Text
            size="xl"
            weight={700}
            mb={12}
          >
            Bantuan-bantuan orang baik
          </Text>
          {rendercampaignDonations()}
          {getCampaignDonationsData?.hasNext ? (
            <Flex
              justify="center"
              mt={16}
            >
              <Button
                onClick={() => setCurrentPage(currentPage + 1)}
                variant="subtle"
                color="dark"
                disabled={isFetching}
              >
                See more
              </Button>
            </Flex>
          ) : null}
        </Box>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const findCampaignBySlug = await prisma.campaign.findUnique({
    where: {
      slug: context?.params?.slug as string,
    },
    include: {
      category: true,
      user: true,
    },
  });

  return {
    props: {
      campaignData: findCampaignBySlug,
    },
  };
};

export default CampaignDetails;
