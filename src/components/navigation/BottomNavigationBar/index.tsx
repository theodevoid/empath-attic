import { Flex } from "@mantine/core";
import { MdHomeFilled, MdReceipt, MdPerson } from "react-icons/md";
import BottomNavigationBarItem from "./BottomNavigationBarItem";

const BottomNavigationBar = () => {
  return (
    <Flex
      py={8}
      sx={{ borderTop: "1px solid lightgray" }}
    >
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
  );
};

export default BottomNavigationBar;
