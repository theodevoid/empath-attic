import { Flex, Text } from "@mantine/core";
import { MdHomeFilled } from "react-icons/md";
import BottomNavigationBarItem from "./BottomNavigationBarItem";

const BottomNavigationBar = () => {
  return (
    <Flex py={8} sx={{ borderTop: "1px solid lightgray" }}>
      <BottomNavigationBarItem icon={<MdHomeFilled size={28} />} text="Home" />
      <BottomNavigationBarItem icon={<MdHomeFilled size={28} />} text="Home" />
      <BottomNavigationBarItem icon={<MdHomeFilled size={28} />} text="Home" />
    </Flex>
  );
};

export default BottomNavigationBar;
