import { Box, type Sx } from "@mantine/core";

type FullPageProps = {
  children: React.ReactNode;
  sx?: Sx;
};

const FullPage = ({ children, sx }: FullPageProps) => {
  return <Box sx={{ height: "calc(100vh - 130px)", ...sx }}>{children}</Box>;
};

export default FullPage;
