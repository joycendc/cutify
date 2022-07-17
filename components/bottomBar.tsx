import { useStoreState } from "easy-peasy";
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { Image, IconButton } from "@chakra-ui/react";
import { MdFavoriteBorder, MdCast } from "react-icons/md";
import Player from "./player";

const BottomBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      bg="#111"
      h="full"
      color="gray"
      p="10px"
    >
      {activeSong ? (
        <>
          <Flex
            h="full"
            gap="20px"
            flex={1.5}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Flex
              h="full"
              gap="15px"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Center ml="5px">
                <Image
                  boxSize="55px"
                  src={`https://picsum.photos/400?random=${activeSong?.id}`}
                  alt={activeSong?.name}
                />
              </Center>
              <Box>
                <Text fontSize="14px" color="#fff" cursor="pointer">
                  {activeSong?.name}
                </Text>
                <Text fontSize="11px">{activeSong?.artist?.name}</Text>
              </Box>
              <Flex alignItems="center">
                <IconButton
                  variant="link"
                  outline="none"
                  aria-label="shuffle"
                  fontSize="18px"
                  _hover={{ color: "#fff" }}
                  icon={<MdFavoriteBorder />}
                />
                <IconButton
                  variant="link"
                  outline="none"
                  outlineColor="transparent"
                  aria-label="shuffle"
                  fontSize="18px"
                  _hover={{
                    color: "#fff",
                  }}
                  icon={<MdCast />}
                />
              </Flex>
            </Flex>
          </Flex>

          <Player songs={songs} activeSong={activeSong} />
        </>
      ) : null}
    </Flex>
  );
};

export default BottomBar;
