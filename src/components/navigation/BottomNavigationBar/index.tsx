import { Flex, Container } from "@mantine/core";
import { BAR_HEIGHT } from "constants/styles";
import { MdHomeFilled, MdReceipt, MdPerson } from "react-icons/md";
import BottomNavigationBarItem from "./BottomNavigationBarItem";

const BottomNavigationBar = () => {
  return (
    <Container
      size="xs"
      sx={{
        borderTop: "1px solid lightgray",
        height: BAR_HEIGHT,
        backgroundColor: "white",
      }}
    >
      <Flex py={8}>
        <BottomNavigationBarItem
          href="/"
          icon={<MdHomeFilled size={28} />}
          text="Home"
        />
        <BottomNavigationBarItem
          href="/history"
          icon={<MdReceipt size={28} />}
          text="History"
        />
        <BottomNavigationBarItem
          href="/profile"
          icon={<MdPerson size={28} />}
          text="Profile"
        />
      </Flex>
    </Container>
  );
};

export default BottomNavigationBar;
