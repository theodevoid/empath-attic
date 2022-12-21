import {
  Box,
  Text,
  Button,
  Container,
  Modal,
  Input,
  Textarea,
  Checkbox,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BAR_HEIGHT } from "constants/styles";
import { useFormik } from "formik";
import * as yup from "yup";

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

export default CampaignDetailsBottomBar;
