import {
  Box,
  Divider,
  Flex,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/layout";
import Image from "next/image";
import Link from "next/link";
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from "react-icons/md";

const Sidebar = () => {
  const navMenu = [
    {
      name: "Home",
      icon: MdHome,
      route: "/",
    },
    {
      name: "Search",
      icon: MdSearch,
      route: "/search",
    },
    {
      name: "Your Library",
      icon: MdLibraryMusic,
      route: "/library",
    },
  ];

  const otherMenu = [
    {
      name: "Create Playlist",
      icon: MdPlaylistAdd,
      route: "/",
    },
    {
      name: "Favorites",
      icon: MdFavorite,
      route: "/favorites",
    },
  ];

  const playlist = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

  return (
    <Flex
      flexDir="column"
      bg="#000"
      h="calc(100vh - 100px)"
      w="100%"
      color="gray"
      padding="10px"
      paddingRight="0px"
    >
      <Box flex={1} pb="5px">
        <Box px="10px">
          <Image src="/logo.svg" height={50} width={90} />
        </Box>
        <List>
          {navMenu.map((menu) => (
            <ListItem
              key={menu.name}
              fontSize="16px"
              _hover={{ bg: "gray.900" }}
              padding="10px"
              paddingY="5px"
            >
              <LinkBox>
                <Link href={menu.route} passHref>
                  <LinkOverlay>
                    <ListIcon as={menu.icon} color="#fff" marginRight="20px" />
                    {menu.name}
                  </LinkOverlay>
                </Link>
              </LinkBox>
            </ListItem>
          ))}
        </List>
        <Divider h="0px" color="transparent" my="10px" />
        <List>
          {otherMenu.map((menu) => (
            <ListItem
              key={menu.name}
              fontSize="16px"
              _hover={{ bg: "gray.900" }}
              padding="10px"
              paddingY="5px"
            >
              <LinkBox>
                <Link href={menu.route} passHref>
                  <LinkOverlay>
                    <ListIcon as={menu.icon} color="#fff" marginRight="20px" />
                    {menu.name}
                  </LinkOverlay>
                </Link>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider h="3px" color="gray.800" w="calc(100% - 25px)" mx="10px" />
      <Box
        flex={2}
        pt="5px"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "9px",
          },
          "&::-webkit-scrollbar-track": {
            width: "9px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray",
            borderRadius: "20px",
          },
        }}
      >
        <List>
          {playlist.map((list) => (
            <ListItem
              key={list}
              fontSize="16px"
              _hover={{ bg: "gray.900" }}
              padding="10px"
              paddingY="5px"
            >
              <LinkBox>
                <Link href="/" passHref>
                  <LinkOverlay>{list}</LinkOverlay>
                </Link>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </Box>
    </Flex>
  );
};

export default Sidebar;
