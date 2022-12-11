import { Sx } from "@mantine/core";
import { Flex, Text, Box } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type BottomNavigationBarItemProps = {
  icon: ReactNode;
  text: string;
  href: string;
};

const BottomNavigationBarItem = ({
  icon,
  text,
  href,
}: BottomNavigationBarItemProps) => {
  const router = useRouter();

  return (
    <Flex
      sx={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
        <Flex
          direction="column"
          align="center"
          sx={(theme) => {
            let styles: Sx = {
              ":hover": {
                cursor: "pointer",
              },
            };

            if (href !== "/") {
              styles.color = router.pathname.startsWith(href)
                ? theme.colors.primary?.[5]
                : "inherit";

              return styles;
            }

            return {
              ...styles,
              color:
                router.pathname == "/" ? theme.colors.primary?.[5] : "inherit",
            };
          }}
        >
          {icon}
          <Text size="xs">{text}</Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export default BottomNavigationBarItem;
