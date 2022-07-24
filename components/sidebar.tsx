import {
  Box,
  Center,
  Divider,
  Flex,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { usePlaylist } from "../lib/hooks";
import { navMenu, otherMenu } from "../data/menu";

const Sidebar = () => {
  const { playlists, isLoading } = usePlaylist();

  return (
    <Flex
      flexDir="column"
      bg="#000"
      h="calc(100vh - 90px)"
      w="full"
      color="gray"
      padding="10px"
      paddingRight="0px"
    >
      <Box flex={1} pb="5px">
        <Box px="10px">
          <Image src="/logo.svg" height={70} width={120} />
        </Box>
        <List sx={{ "--my-color": "#bbb" }}>
          {navMenu.map((menu) => (
            <ListItem
              key={menu.name}
              fontSize="16px"
              _hover={{ "--my-color": "white" }}
              padding="10px"
              paddingY="5px"
            >
              <LinkBox>
                <Link href={menu.route} passHref>
                  <LinkOverlay>
                    <Flex alignItems="center">
                      <ListIcon
                        as={menu.icon}
                        color="var(--my-color)"
                        marginRight="15px"
                        boxSize={30}
                      />
                      <Text
                        fontWeight="bold"
                        fontSize="sm"
                        color="var(--my-color)"
                      >
                        {menu.name}
                      </Text>
                    </Flex>
                  </LinkOverlay>
                </Link>
              </LinkBox>
            </ListItem>
          ))}
        </List>
        <Divider h="0px" color="transparent" my="10px" />
        <List sx={{ "--my-color": "#bbb" }}>
          {otherMenu.map((menu) => (
            <ListItem
              key={menu.name}
              fontSize="16px"
              _hover={{ "--my-color": "white" }}
              padding="10px"
              paddingY="5px"
            >
              <LinkBox>
                <Link href={menu.route} passHref>
                  <LinkOverlay>
                    <Flex alignItems="center">
                      <ListIcon
                        as={menu.icon}
                        marginRight="15px"
                        boxSize={30}
                      />
                      <Text
                        fontWeight="bold"
                        fontSize="sm"
                        color="var(--my-color)"
                      >
                        {menu.name}
                      </Text>
                    </Flex>
                  </LinkOverlay>
                </Link>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider h="3px" color="gray.800" w="calc(full - 40px)" mx="10px" />
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
        {isLoading ? (
          <Center mt="50px">
            <CircularProgress size="30px" isIndeterminate color="green.300" />
          </Center>
        ) : (
          <Box>
            {playlists?.length ? (
              <List>
                {playlists.map((playlist) => (
                  <ListItem
                    key={playlist.id}
                    fontSize="16px"
                    padding="10px"
                    paddingY="5px"
                  >
                    <LinkBox>
                      <Link
                        href={{
                          pathname: `/playlist/${playlist.id}`,
                          query: { id: playlist.id },
                        }}
                        passHref
                      >
                        <LinkOverlay>
                          <Text color="white">{playlist.name}</Text>
                        </LinkOverlay>
                      </Link>
                    </LinkBox>
                  </ListItem>
                ))}
              </List>
            ) : null}
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Sidebar;
