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
  category: string;
};

const Campaign = ({
  accuAmount,
  endDate,
  imageUrl,
  shortDescription,
  targetAmount,
  title,
  slug,
  category,
}: CampaignProps) => {
  const renderDanaTerkumpul = () => {
    if (targetAmount) {
      return (
        <Text
          size="lg"
          weight={700}
        >
          Rp. {accuAmount.toLocaleString()} / Rp.{" "}
          {targetAmount?.toLocaleString()}
        </Text>
      );
    }

    return (
      <Text
        size="lg"
        weight={700}
      >
        Rp. {accuAmount.toLocaleString()}
      </Text>
    );
  };

  return (
    <Card
      withBorder
      radius="md"
      pos="unset"
    >
      <Card.Section withBorder>
        <Link href={`/campaign/${slug}`}>
          <Image
            styles={{
              imageWrapper: {
                position: "unset",
              },
            }}
            height={160}
            src={imageUrl}
            alt="Donation"
          />
        </Link>
      </Card.Section>
      <Badge
        mt="md"
        color="green"
      >
        {category}
      </Badge>
      <Text
        size="lg"
        mt={8}
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
          {renderDanaTerkumpul()}
          <Badge>Sisa {getDaysLeftFromDate(moment(), endDate)} hari</Badge>
        </Group>
      </Box>
      <Progress
        mt="sm"
        value={targetAmount ? (accuAmount / targetAmount) * 100 : 100}
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
