import { useState } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdMoreHoriz,
  MdPauseCircle,
  MdPlayCircle,
} from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Th, Table, Thead } from "./styledComponents";
import SongItem from "./songItem";

const SongsTable = ({ songs }) => {
  const playSongs = useStoreActions(
    (actions: any) => actions.changeActiveSongs
  );
  const setActiveSong = useStoreActions(
    (actions: any) => actions.changeActiveSong
  );
  const changePlayState = useStoreActions(
    (actions: any) => actions.changePlayState
  );
  const isPlaying = useStoreState((state: any) => state.isPlaying);
  const [isFavorite, setIsFavorite] = useState(true);

  const playSong = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
    changePlayState(true);
  };

  const pauseSong = () => {
    changePlayState(false);
  };

  return (
    <Box bg="rgba(0,0,0,0.5)">
      <Flex gap="30px" alignItems="center" mx="20px" pt="20px">
        <Box _hover={{ transform: "scale(1.05)" }}>
          {isPlaying ? (
            <IconButton
              variant="link"
              outline="none"
              aria-label="pause"
              fontSize="70px"
              color="#1ed760"
              onClick={pauseSong}
              icon={<MdPauseCircle />}
            />
          ) : (
            <IconButton
              variant="link"
              outline="none"
              aria-label="play"
              fontSize="70px"
              color="#1ed760"
              onClick={() => playSong()}
              icon={<MdPlayCircle />}
            />
          )}
        </Box>
        <Box onClick={() => setIsFavorite(!isFavorite)}>
          {isFavorite ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="remove-favorite"
              fontSize="35px"
              color="#1ed760"
              icon={<MdFavorite />}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="add-favorite"
              fontSize="35px"
              _hover={{ color: "#fff" }}
              color="gray"
              icon={<MdFavoriteBorder />}
            />
          )}
        </Box>
        <IconButton
          outline="none"
          variant="link"
          aria-label="more"
          fontSize="30px"
          _hover={{ color: "#fff" }}
          color="gray"
          icon={<MdMoreHoriz />}
        />
      </Flex>
      <Box my="20px">
        <Table>
          <Thead>
            <tr>
              <Th>#</Th>
              <Th>TITLE</Th>
              <Th>ARTIST</Th>
              <Th>DATE ADDED</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </tr>
          </Thead>
          <tbody>
            {songs?.map((song, i) => (
              <SongItem
                song={song}
                key={song.id}
                number={i + 1}
                playSong={playSong}
              />
            ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
