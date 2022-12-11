import { Flex, Text } from "@mantine/core";
import { ReactNode } from "react";

type BottomNavigationBarItemProps = {
  icon: ReactNode;
  text: string;
};

const BottomNavigationBarItem = ({
  icon,
  text,
}: BottomNavigationBarItemProps) => {
  return (
    <Flex
      sx={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Flex
        direction="column"
        align="center"
        sx={{
          ":hover": { cursor: "pointer" },
        }}
      >
        {icon}
        <Text color="gray" size="xs">
          {text}
        </Text>
      </Flex>
    </Flex>
  );
};

export default BottomNavigationBarItem;
