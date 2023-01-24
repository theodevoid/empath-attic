import { Box, Text, Avatar, Flex } from "@mantine/core";

type DonationCardProps = {
  username: string;
  amount: number;
  imageUrl: string;
  message?: string | undefined | null;
};

const DonationCard = ({
  username,
  amount,
  imageUrl,
  message,
}: DonationCardProps) => {
  return (
    <Box
      sx={{ border: "1px solid lightgray", borderRadius: "8px" }}
      px={16}
      py={12}
    >
      <Flex align="center">
        <Avatar
          size="md"
          sx={{ borderRadius: "50%" }}
          src={imageUrl}
        />
        <Box ml={16}>
          <Text
            size="md"
            weight={500}
          >
            {username}
          </Text>
          <Text
            size="lg"
            weight={500}
            color="primary"
          >
            Rp {amount.toLocaleString("id-ID")}
          </Text>
        </Box>
      </Flex>
      <Text
        mt={12}
        sx={{ color: "#616161" }}
      >
        {message}
      </Text>
    </Box>
  );
};

export default DonationCard;
