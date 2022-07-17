import Link from "next/link";
import { Box, Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { Avatar, Image } from "@chakra-ui/react";
import { MdFavorite, MdMoreHoriz } from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import GradientLayout from "../components/gradientLayout";
import { useMe } from "../lib/hooks";
import { prisma } from "../lib/prisma";

const Home = ({ artists, songs }) => {
  const { user, isLoading } = useMe();
  const playSongs = useStoreActions(
    (actions: any) => actions.changeActiveSongs
  );
  const setActiveSong = useStoreActions(
    (actions: any) => actions.changeActiveSong
  );
  const changePlayState = useStoreActions(
    (actions: any) => actions.changePlayState
  );

  const playSong = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
    changePlayState(true);
  };

  return (
    <Box h="calc(100vh - 90px)" color="#fff">
      <GradientLayout
        color="gray"
        image="https://bit.ly/dan-abramov"
        subtitle="Profile"
        title={`${user?.firstName} ${user?.lastName}`}
        description="15 Public Playlist"
        roundImage
        isLoading={isLoading}
        songs={songs}
      >
        <Box p="20px" bg="rgba(0,0,0,0.5)">
          <Box borderRadius="50%">
            <MdMoreHoriz size={20} />
          </Box>
          <Box mt="15px">
            <Flex justifyContent="space-between" alignItems="flex-end">
              <Box>
                <Text fontWeight="bold">Top artists this month</Text>
                <Text fontSize="xs">Only visible to you</Text>
              </Box>
              <Box cursor="pointer">
                <Text fontSize="xs" color="gray.400" fontWeight="bold">
                  SEE ALL
                </Text>
              </Box>
            </Flex>
          </Box>
          <Flex flexWrap="wrap" gap="18px" my="10px">
            {artists.map((artist) => (
              <LinkBox
                key={artist.id}
                bgGradient="linear(to-b, #171717,#181818)"
                _hover={{ bg: "gray.900" }}
                p="15px"
                pb="30px"
                borderRadius={5}
              >
                <Link
                  href={{
                    pathname: `/playlist/${artist.id}`,
                    query: { id: artist.id },
                  }}
                  passHref
                >
                  <LinkOverlay>
                    <Flex
                      flexDir="column"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Avatar
                        boxSize="150px"
                        name={artist.name}
                        src={artist.src}
                        boxShadow="-1px 14px 34px 1px rgba(0,0,0,0.33)"
                        m="10px"
                        mb="15px"
                      />
                      <Box textAlign="left" w="100%" px="10px">
                        <Text fontSize="md" fontWeight="bold">
                          {artist.name}
                        </Text>
                        <Text fontSize="sm" color="gray.400">
                          Artist
                        </Text>
                      </Box>
                    </Flex>
                  </LinkOverlay>
                </Link>
              </LinkBox>
            ))}
          </Flex>
          <Box mt="25px">
            <Flex justifyContent="space-between" alignItems="flex-end">
              <Box>
                <Text fontWeight="bold">Top tracks this month</Text>
                <Text fontSize="xs">Only visible to you</Text>
              </Box>
              <Box cursor="pointer">
                <Text fontSize="xs" color="gray.400" fontWeight="bold">
                  SEE ALL
                </Text>
              </Box>
            </Flex>
            <Box my="20px">
              {songs?.map((song, i) => (
                <Flex
                  key={i}
                  py="5px"
                  _hover={{ bg: "gray.700" }}
                  alignItems="center"
                  cursor="pointer"
                  onClick={() => playSong(song)}
                >
                  <Flex flex={4} ml="5px" alignItems="center" gap="10px">
                    <Text textAlign="right" width="1.5em">
                      {i + 1}
                    </Text>
                    <Image
                      boxSize="35px"
                      src={`https://picsum.photos/400?random=${song.id}`}
                      alt={song.name}
                    />
                    <Box>
                      <Text lineHeight="16px" fontSize="s" fontWeight="bold">
                        {song.name}
                      </Text>
                    </Box>
                  </Flex>
                  <Text flex={2} color="gray.400">
                    Artist
                  </Text>
                  <Flex
                    flex={1}
                    alignItems="center"
                    justifyContent="flex-end"
                    mr="35px"
                    gap="15px"
                  >
                    <MdFavorite size={14} color="#1DB954" />
                    <Text color="gray.500" fontSize="xs">
                      1:09
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Box>
          </Box>
        </Box>
      </GradientLayout>
    </Box>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  const songs = await prisma.song.findMany({});

  return {
    props: { artists, songs },
  };
};

export default Home;
