import Link from "next/link";
import { Box, Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/react";
import { useState } from "react";
import getRandomColor from "../lib/randomColor";
import GradientLayout from "../components/gradientLayout";
import SongCard from "../components/songCard";
import { useMe } from "../lib/hooks";
import { prisma } from "../lib/prisma";
import { validateToken } from "../lib/auth";

const Home = ({ artists, songs }) => {
  const { user, isLoading } = useMe();
  const [color, setColor] = useState("gray");

  const handleHover = (id: Number) => {
    setColor(getRandomColor(id));
  };

  const handleUnhover = () => {
    setColor("gray");
  };

  return (
    <Box h="calc(100vh - 90px)" color="#fff">
      <GradientLayout
        color={color}
        image="https://bit.ly/dan-abramov"
        subtitle="Profile"
        title={`${user?.firstName}`}
        description="15 Public Playlist"
        roundImage
        isLoading={isLoading}
        songs={songs}
        home={true}
      >
        <Box my="20px" mx="30px">
          <Box>
            <Text fontWeight="700" fontSize="3xl" mb="20px">
              Hello, {user?.firstName}
            </Text>
          </Box>
          <Flex flexWrap="wrap">
            {songs?.map((song, i: Number) => (
              <SongCard
                song={song}
                key={i}
                songs={songs}
                handleHover={handleHover}
                handleUnhover={handleUnhover}
              />
            ))}
          </Flex>
        </Box>
        <Box p="20px">
          <Box mt="15px">
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <Text fontWeight="700" fontSize="2xl" mb="20px">
                  Suggested Artist
                </Text>
              </Box>
              <Box cursor="pointer">
                <Text fontSize="xs" color="gray.400" fontWeight="bold">
                  SEE ALL
                </Text>
              </Box>
            </Flex>
          </Box>
          <Flex flexWrap="wrap" gap="16px" my="10px">
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
        </Box>
      </GradientLayout>
    </Box>
  );
};

export const getServerSideProps = async ({ req }) => {
  try {
    validateToken(req.cookies.CUTIFY_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const artists = await prisma.artist.findMany({});
  const songs = await prisma.song.findMany({});

  return {
    props: { artists, songs },
  };
};

export default Home;
