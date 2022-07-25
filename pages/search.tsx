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
          Search
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
