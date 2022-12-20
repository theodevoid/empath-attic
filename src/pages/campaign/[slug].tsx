import {
  Box,
  Image,
  Text,
  Progress,
  Badge,
  Avatar,
  Flex,
  Button,
  Container,
  Modal,
  Input,
  Textarea,
  Checkbox,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Layout from "components/layout";
import { BAR_HEIGHT } from "constants/styles";
import { useFormik } from "formik";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdChevronLeft } from "react-icons/md";
import * as yup from "yup";
import { prisma } from "server/db/client";
import type { Campaign, Category, User } from "@prisma/client";

// TODO: Refactor bottom bar
// TODO: Make modal reusable
const CampaignDetailsBottomBar = ({ campaignId }: { campaignId: string }) => {
  const [opened, handlers] = useDisclosure(false);

  const formik = useFormik({
    initialValues: {
      amount: 0,
      message: "",
    },
    onSubmit: async () => {
      return;
    },
    validationSchema: yup.object().shape({
      amount: yup
        .number()
        .required()
        .min(10_000, "Minimum pemberian Rp. 10.000")
        .max(100_000_000, "Maximum pemberian Rp. 100.000.000"),
    }),
  });

  const handleNominalInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;

    if (value) {
      formik.setFieldValue("amount", parseInt(value.replace(/[^0-9]+/g, "")));
      return;
    }

    formik.setFieldValue("amount", 0);
  };

  return (
    <>
      <Container
        size="xs"
        sx={{
          borderTop: "1px solid lightgray",
          height: BAR_HEIGHT,
          backgroundColor: "white",
        }}
      >
        <Box
          pb="md"
          pt="sm"
        >
          <Button
            onClick={handlers.open}
            fullWidth
          >
            Berikan bantuan
          </Button>
        </Box>
      </Container>
      <Modal
        opened={opened}
        onClose={handlers.close}
        title="Berikan bantuan"
        styles={{
          title: {
            fontWeight: 500,
          },
        }}
      >
        <Input.Wrapper
          label="Nominal Donasi"
          withAsterisk
          error={formik.errors.amount}
        >
          <Input
            size="xl"
            icon={<Text size="lg">Rp.</Text>}
            placeholder={(10000).toLocaleString("id-ID")}
            onChange={handleNominalInput}
            value={formik.values.amount.toLocaleString("id-ID")}
          />
        </Input.Wrapper>
        <Input.Wrapper
          label="Tulis sebuah pesan"
          mt="md"
        >
          <Textarea
            size="md"
            minRows={3}
          />
        </Input.Wrapper>
        <Checkbox
          label="Berikan bantuan secara anonim"
          mt="md"
        />
        <Button
          fullWidth
          mt="lg"
          onClick={() => formik.handleSubmit}
        >
          Lanjutkan pembayaran
        </Button>
      </Modal>
    </>
  );
};

type CampaignDetailsProps = {
  campaignData: Campaign & {
    category: Category;
    user: User;
  };
};

const CampaignDetails = ({ campaignData }: CampaignDetailsProps) => {
  const router = useRouter();
  const { slug } = router.query;

  const {
    id,
    category,
    name,
    short_description,
    total_accumulated,
    target_amount,
    user,
  } = campaignData;

  return (
    <Layout
      topBarHeight="48px"
      topBar={
        <Flex
          h="48px"
          bg="primary"
          sx={{
            alignItems: "center",
            position: "relative",
            justifyContent: "center",
          }}
        >
          <Link
            href="/"
            style={{ height: "40px", position: "fixed", left: 0 }}
          >
            <MdChevronLeft
              size="40px"
              color="white"
            />
          </Link>
          <Text
            color="white"
            weight={500}
          >
            Tentang Penggalangan Dana
          </Text>
        </Flex>
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
            Rp. {total_accumulated.toLocaleString("id-ID")}
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
    </Layout>
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
