import {
  Box,
  Flex,
  List,
  ListItem,
  ListIcon,
  Text,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import {
  Avatar,
  Image,
  Skeleton,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdImageSearch,
  MdOutlineOpenInNew,
  MdOutlineSearch,
  MdPauseCircle,
  MdPlayCircle,
} from "react-icons/md";
import { useMe } from "../lib/hooks";
import { menu } from "../data/menu";

const GradientLayout = ({
  color,
  children,
  image,
  title,
  subtitle,
  description,
  songs,
  roundImage = false,
  isLoading = false,
  home = false,
}) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolledPos, setScrolledPos] = useState(0);
  const search = useRef(null);
  const box = useRef(null);
  const { user, isLoading: userLoading } = useMe();
  const router = useRouter();
  const isPlaying = useStoreState((state: any) => state.isPlaying);
  const playSongs = useStoreActions(
    (actions: any) => actions.changeActiveSongs
  );
  const setActiveSong = useStoreActions(
    (actions: any) => actions.changeActiveSong
  );
  const changePlayState = useStoreActions(
    (actions: any) => actions.changePlayState
  );

  const handleScroll = () => {
    const scrolled = box.current.scrollTop;

    setScrolledPos(scrolled);
  };

  const calculateBg = () => {
    if (scrolledPos === 0) return "transparent";
    return `${color}.700`;
  };
  const handleBack = () => {
    if (router.pathname !== "/") {
      router.push("/");
    }
  };

  useEffect(() => {
    box.current.addEventListener("scroll", handleScroll);
    search.current?.focus();
  }, []);

  useEffect(() => {}, [isPlaying]);

  const playSong = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
    changePlayState(true);
  };

  const pauseSong = () => {
    changePlayState(false);
  };

  const logout = async (name: String) => {
    if (name === "Logout") {
      await fetch(`${baseURL}/api/logout`, {
        method: "GET",
      });
    }
  };

  return (
    <Box
      ref={box}
      overflow={showMenu ? "hidden" : "auto"}
      css={{
        "&::-webkit-scrollbar": {
          width: "12px",
        },
        "&::-webkit-scrollbar-track": {
          width: "14px",
          background: "RGBA(0, 0, 0, 0.60)",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "RGBA(255, 255, 255, 0.45)",
        },
      }}
      pr={showMenu ? "12px" : "0px"}
      h="full"
      bgGradient={
        scrolledPos > 200
          ? `linear(gray.900 0%, gray.900 100%)`
          : `linear(${color}.600 0%, ${color}.700 15%, ${color}.800 40%, rgba(0,0,0,0.95) 75%)`
      }
    >
      <Flex flexDir="column" px="30px" h={home ? "60px" : "60%"}>
        <Flex
          top="0"
          right="0"
          w="calc(100vw - 250px)"
          position="fixed"
          alignItems="center"
          justifyContent="space-between"
          px="26px"
          zIndex={1}
          opacity={scrolledPos > 0 && scrolledPos < 100 ? "0.5" : "1"}
          bg={calculateBg()}
        >
          <Flex gap="10px" align="center">
            <Flex gap="10px" align="center" py="15px">
              <Box
                bg="rgba(0,0,0,0.4)"
                borderRadius="50%"
                onClick={() => handleBack()}
                boxSize="35px"
              >
                <MdChevronLeft
                  color={router.pathname !== "/" ? "white" : "#ccc"}
                  size={35}
                />
              </Box>
              <Box bg="rgba(0,0,0,0.4)" borderRadius="50%" boxSize="35px">
                <MdChevronRight color="#ccc" size={35} />
              </Box>
            </Flex>
            {router.pathname === "/search" && (
              <Box w="350px">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdOutlineSearch color="black" size={25} />}
                  />
                  <Input
                    ref={search}
                    bg="white"
                    color="black"
                    outline="none"
                    _placeholder={{
                      color: "gray.700",
                      fontWeight: "400",
                      fontSize: "sm",
                      px: "2px",
                    }}
                    placeholder="Artists, songs or podcasts"
                    borderRadius={25}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {query.length ? (
                    <InputRightElement
                      onClick={() => setQuery("")}
                      children={<MdClose color="black" size={25} />}
                    />
                  ) : null}
                </InputGroup>
              </Box>
            )}
            {scrolledPos > 250 ? (
              <Flex align="center">
                <Box _hover={{ transform: "scale(1.05)" }} mr="10px">
                  {isPlaying ? (
                    <IconButton
                      variant="link"
                      outline="none"
                      aria-label="pause"
                      fontSize="60px"
                      color="#1ed760"
                      onClick={pauseSong}
                      icon={<MdPauseCircle />}
                    />
                  ) : (
                    <IconButton
                      variant="link"
                      outline="none"
                      aria-label="play"
                      fontSize="60px"
                      color="#1ed760"
                      onClick={() => playSong()}
                      icon={<MdPlayCircle />}
                    />
                  )}
                </Box>
                <Text fontSize="2xl" fontWeight="bold">
                  {title}
                </Text>
              </Flex>
            ) : null}
          </Flex>
          <Flex gap="30px">
            <Skeleton isLoaded={!userLoading}>
              {user?.isSubscribed ? null : (
                <Flex
                  h="full"
                  bg="transparent"
                  borderRadius={20}
                  mr="5px"
                  onClick={() => router.push("/plans")}
                  cursor="pointer"
                  px="15px"
                  border="1px solid #666"
                  align="center"
                >
                  <Text fontSize="sm" fontWeight="600" lineHeight="20px">
                    Upgrade
                  </Text>
                </Flex>
              )}
            </Skeleton>
            <Skeleton isLoaded={!userLoading}>
              <Flex
                alignItems="center"
                bg="gray.800"
                borderRadius={20}
                p="1px"
                px="2px"
                mr="5px"
                position="relative"
                onClick={() => setShowMenu(!showMenu)}
                cursor="pointer"
              >
                <Avatar
                  userSelect="none"
                  width="25px"
                  height="25px"
                  name={user?.firstName}
                  src="https://bit.ly/sage-adebayo"
                />
                <Text
                  userSelect="none"
                  fontSize="sm"
                  fontWeight="900"
                  pl="5px"
                  pr="2px"
                >
                  {user?.firstName}
                </Text>
                {showMenu ? (
                  <MdArrowDropUp size={30} />
                ) : (
                  <MdArrowDropDown size={30} />
                )}
                {showMenu ? (
                  <Box
                    bg="gray.800"
                    borderRadius={5}
                    position="absolute"
                    top="100%"
                    right="0"
                    w="200px"
                    mt="10px"
                    p="5px"
                    color="gray.200"
                    boxShadow="-1px 10px 20px 1px rgba(0,0,0,0.33)"
                  >
                    <List>
                      {menu.map((item, i) => {
                        if (user?.isSubscribed && i === 2) return null;
                        return (
                          <ListItem
                            borderRadius={5}
                            _hover={{ bg: "gray.700" }}
                            key={item.name}
                            onClick={() => logout(item.name)}
                          >
                            <LinkBox>
                              <Link href={item?.route || "/"} passHref>
                                <LinkOverlay>
                                  <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                    p="10px"
                                    pr="0px"
                                  >
                                    <Text fontSize="sm" mr="15px">
                                      {item.name}
                                    </Text>
                                    {item.hasIcon ? (
                                      <ListIcon
                                        as={MdOutlineOpenInNew}
                                        w="20px"
                                        h="20px"
                                      />
                                    ) : null}
                                  </Flex>
                                </LinkOverlay>
                              </Link>
                            </LinkBox>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                ) : null}
              </Flex>
            </Skeleton>
          </Flex>
        </Flex>
        {home ? null : (
          <Flex flex={1} my="5px" alignItems="flex-end">
            <Image
              boxSize="220px"
              src={image}
              boxShadow="-1px 10px 20px 1px rgba(0,0,0,0.33)"
              mb="20px"
              borderRadius={roundImage ? "full" : "3px"}
            />
            <Flex
              h="full"
              alignItems="flex-start"
              justifyContent="flex-end"
              flexDir="column"
              px="20px"
              color="white"
              mb="20px"
            >
              <Skeleton isLoaded={!isLoading} mb="5px">
                <Text fontSize="11px" casing="uppercase" fontWeight="bold">
                  {subtitle}
                </Text>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} mb="5px">
                <Text fontSize="100px" fontWeight="bold" lineHeight="90px">
                  {title}
                </Text>
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <Text mt="10px" fontSize="14px" fontWeight="100">
                  {description}
                </Text>
              </Skeleton>
            </Flex>
          </Flex>
        )}
      </Flex>

      {children}
    </Box>
  );
};

export default GradientLayout;
