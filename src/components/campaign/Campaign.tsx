import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Progress,
  Text,
} from "@mantine/core";
import moment, { type Moment } from "moment";
import Link from "next/link";
import { getDaysLeftFromDate } from "utils/date";

type CampaignProps = {
  imageUrl: string;
  id: string | number;
  shortDescription: string;
  accuAmount: number;
  targetAmount?: number;
  endDate: Moment;
  title: string;
  slug: string;
};

const Campaign = ({
  accuAmount,
  endDate,
  imageUrl,
  shortDescription,
  targetAmount,
  title,
  slug,
}: CampaignProps) => {
  console.log(endDate);

  return (
    <Card
      withBorder
      radius="md"
    >
      <Card.Section>
        <Link href={`/campaign/${slug}`}>
          <Image
            height={160}
            src={imageUrl}
            alt="Donation"
          />
        </Link>
      </Card.Section>
      <Text
        mt="md"
        size="lg"
        weight={700}
      >
        {title}
      </Text>
      <Text
        size="sm"
        mt={4}
        color="dimmed"
      >
        {shortDescription}
      </Text>
      <Link
        href={`/campaign/${slug}`}
        passHref
      >
        <Text
          size="sm"
          sx={{ textDecoration: "underline" }}
        >
          Lihat lebih lanjut
        </Text>
      </Link>
      <Box mt="md">
        <Text size="sm">Dana terkumpul</Text>
        <Group position="apart">
          <Text
            size="lg"
            weight={700}
          >
            Rp. {accuAmount.toLocaleString()} / Rp.{" "}
            {targetAmount?.toLocaleString()}
          </Text>
          <Badge>Sisa {getDaysLeftFromDate(moment(), endDate)} hari</Badge>
        </Group>
      </Box>
      <Progress
        mt="sm"
        value={50}
      />
      <Button
        fullWidth
        variant="light"
        mt="md"
        size="md"
      >
        Berikan bantuan
      </Button>
    </Card>
  );
};

export default Campaign;
