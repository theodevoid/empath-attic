import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Progress,
  Text,
} from "@mantine/core";
import Link from "next/link";

const Campaign = () => {
  return (
    <Card
      withBorder
      radius="md"
    >
      <Card.Section>
        <Link href="/campaign/id">
          <Image
            height={160}
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            alt="Donation"
          />
        </Link>
      </Card.Section>
      <Text
        mt="md"
        size="lg"
        weight={700}
      >
        Bantu para penerus bangsa melanjutkan pendidikan
      </Text>
      <Text
        size="sm"
        mt={4}
        color="dimmed"
      >
        This is a short description. Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. At, est nostrum sit harum nobis inventore explicabo
        reprehenderit rerum amet incidunt!
      </Text>
      <Link
        href="/campaign/id"
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
            Rp. {(500_000).toLocaleString()} / Rp.{" "}
            {(1_000_000).toLocaleString()}
          </Text>
          <Badge>Sisa 5 hari</Badge>
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
