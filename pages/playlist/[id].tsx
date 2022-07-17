import { Box } from "@chakra-ui/layout";
import GradientLayout from "../../components/gradientLayout";
import { prisma } from "../../lib/prisma";
import { validateToken } from "../../lib/auth";
import SongsTable from "../../components/songsTable";
import getRandomColor from "../../lib/randomColor";

const Playlist = ({ playlist }) => {
  const color = getRandomColor(playlist.id);

  return (
    <Box h="calc(100vh - 90px)" color="#fff">
      <GradientLayout
        color={color}
        image={`https://picsum.photos/400?random=${playlist.id}`}
        subtitle="Playlist"
        title={playlist?.name}
        description={`${playlist.songs.length} Public Songs`}
        songs={playlist.songs}
      >
        <SongsTable songs={playlist.songs} />
      </GradientLayout>
    </Box>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;
  try {
    user = validateToken(req.cookies.CUTIFY_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/sigin",
      },
    };
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      playlist,
    },
  };
};

export default Playlist;
