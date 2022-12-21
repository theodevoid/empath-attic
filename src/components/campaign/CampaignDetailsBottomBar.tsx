import { Box, Button, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DonationModal from "components/donation/DonationModal";
import { BAR_HEIGHT } from "constants/styles";

const CampaignDetailsBottomBar = ({ campaignId }: { campaignId: string }) => {
  const [opened, handlers] = useDisclosure(false);

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
      <DonationModal
        campaignId={campaignId}
        onClose={handlers.close}
        opened={opened}
      />
    </>
  );
};

export default CampaignDetailsBottomBar;
