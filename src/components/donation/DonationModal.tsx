import {
  Text,
  Button,
  Modal,
  Input,
  Textarea,
  Checkbox,
  Loader,
  Box,
  Alert,
  Anchor,
  Flex,
} from "@mantine/core";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { MdCheck, MdInfo } from "react-icons/md";
import { trpc } from "utils/trpc";
import * as yup from "yup";
import { useRouter } from "next/router";

type AfterSubmitStateProps = {
  invoiceUrl: string;
  campaignDonationId: string;
};

const AfterSubmitState = ({
  invoiceUrl,
  campaignDonationId,
}: AfterSubmitStateProps) => {
  const {
    data: campaignData,
    isSuccess,
    isFetching,
    refetch: refetchDonationStatus,
    isLoading,
  } = trpc.campaign.checkDonationPaymentStatus.useQuery(
    {
      campaignDonationId,
    },
    {
      refetchOnWindowFocus: true,
    },
  );

  // refetches campaign donation status
  const refetchData = () => {
    refetchDonationStatus();
  };

  return (
    <Box>
      {campaignData?.status == "PAID" ? (
        <Alert
          icon={<MdCheck />}
          title="Pembayaran berhasil!"
          color="green"
        >
          Pembayaran kamu sudah berhasil! Terima kasih atas bantuannya sahabat
          berempati!
        </Alert>
      ) : (
        <>
          <Alert
            icon={<MdInfo />}
            title="Invoice berhasil terbuat!"
            color="blue"
          >
            Yey! Invoice kamu sudah sukses terbuat. Selesaikan pembayaran untuk
            menyelesaikan proses donasi.
          </Alert>
          <Text
            size="sm"
            align="center"
            mt="md"
          >
            Klik link di bawah ini jika layar kamu tidak dipindahkan
          </Text>
          <Flex justify="center">
            <Anchor
              align="center"
              size="sm"
              mt={4}
              href={invoiceUrl}
              target="_blank"
            >
              {invoiceUrl.slice(0, 50)}
            </Anchor>
          </Flex>
          <Button
            mt="xl"
            fullWidth
            color="green"
            onClick={() => refetchData()}
            disabled={isLoading || isFetching}
          >
            {isLoading ? <Loader /> : "Aku sudah melakukan pembayaran"}
          </Button>
        </>
      )}
    </Box>
  );
};

type DonationModalProps = {
  opened: boolean;
  onClose: () => void;
  campaignId: string;
};

// TODO: cannot open if user is not logged in
const DonationModal = ({ opened, onClose, campaignId }: DonationModalProps) => {
  const {
    isLoading,
    mutate: handleSubmitDonation,
    data: donationData,
    isSuccess,
    reset,
  } = trpc.campaign.donateToCampaign.useMutation();
  const { data: userData, status } = useSession();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      amount: 0,
      message: "",
      isAnonymous: false,
    },
    onSubmit: async values => {
      const { amount, message } = values;

      handleSubmitDonation({ amount, message, campaignId });
    },
    validationSchema: yup.object().shape({
      amount: yup
        .number()
        .required()
        .min(10_000, "Minimum pemberian Rp. 10.000")
        .max(100_000_000, "Maximum pemberian Rp. 100.000.000"),
      message: yup.string().nullable(),
      isAnonymouse: yup.boolean(),
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

  const handleMessageInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { target } = event;
    const { value } = target;

    if (value) {
      formik.setFieldValue("message", value);
      return;
    }
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.currentTarget;

    formik.setFieldValue("isAnonymous", checked);
  };

  useEffect(() => {
    if (!opened) {
      reset();
    }
  }, [opened]);

  useEffect(() => {
    if (isSuccess) {
      window.open(donationData?.payment_gateway_invoice_url as string);
    }
  }, [isSuccess, donationData?.payment_gateway_invoice_url]);

  useEffect(() => {
    if (status == "unauthenticated" && opened) {
      router.push("/auth/login");
    }
  }, [status, opened]);

  return (
    <Modal
      closeOnClickOutside={false}
      opened={opened}
      onClose={onClose}
      title="Berikan bantuan"
      styles={{
        title: {
          fontWeight: 500,
        },
      }}
    >
      {isSuccess ? (
        <AfterSubmitState
          campaignDonationId={donationData?.id as string}
          invoiceUrl={donationData?.payment_gateway_invoice_url as string}
        />
      ) : (
        <>
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
              disabled={isLoading}
            />
          </Input.Wrapper>
          <Input.Wrapper
            label="Tulis sebuah pesan"
            mt="md"
          >
            <Textarea
              size="md"
              minRows={3}
              onChange={handleMessageInput}
              disabled={isLoading}
            />
          </Input.Wrapper>
          <Checkbox
            label="Berikan bantuan secara anonim"
            mt="md"
            onChange={handleCheckbox}
          />
          {formik.isValid}
          <Button
            fullWidth
            mt="lg"
            onClick={() => formik.handleSubmit()}
            disabled={isLoading}
          >
            {isLoading ? <Loader size="sm" /> : "Lanjutkan pembayaran"}
          </Button>
        </>
      )}
    </Modal>
  );
};

export default DonationModal;
