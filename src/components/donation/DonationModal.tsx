import { Text, Button, Modal, Input, Textarea, Checkbox } from "@mantine/core";
import { useFormik } from "formik";
import * as yup from "yup";

type DonationModalProps = {
  opened: boolean;
  onClose: () => void;
  campaignId: string;
};

const DonationModal = ({ opened, onClose }: DonationModalProps) => {
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
    <Modal
      opened={opened}
      onClose={onClose}
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
  );
};

export default DonationModal;
