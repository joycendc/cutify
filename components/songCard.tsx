import { IconButton, Image } from "@chakra-ui/react";
import { MdPauseCircle, MdPlayCircle } from "react-icons/md";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useState } from "react";

const SongCard = ({ song, key, songs, handleHover, handleUnhover }) => {
  const playSongs = useStoreActions(
    (actions: any) => actions.changeActiveSongs
  );
  const setActiveSong = useStoreActions(
    (actions: any) => actions.changeActiveSong
  );
  const changePlayState = useStoreActions(
    (actions: any) => actions.changePlayState
  );
  const activeSongData = useStoreState((state: any) => state.activeSong);
  const isPlaying = useStoreState((state: any) => state.isPlaying);
  const [hovered, setHovered] = useState(false);

  const pauseSong = () => {
    changePlayState(false);
  };

  const playSong = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
    changePlayState(true);
  };

  const onHover = () => {
    handleHover(key);
    setHovered(true);
  };

  const onUnhover = () => {
    handleUnhover();
    setHovered(false);
  };

  return (
    <Flex
      _hover={{ bg: "gray.800" }}
      alignItems="center"
      cursor="pointer"
      onClick={() => playSong(song)}
      w="30%"
      bg="gray.900"
      mr="20px"
      mb="10px"
      borderRadius="5px"
      onMouseEnter={onHover}
      onMouseLeave={onUnhover}
    >
      <Flex flex={4} align="center" gap="15px">
        <Image
          boxSize="80px"
          src={`https://picsum.photos/400?random=${song.id}`}
          alt={song.name}
          borderLeftRadius="5px"
          flex={1}
        />
        <Flex flex={3} align="center" justify="space-between">
          <Text lineHeight="16px" fontSize="s" fontWeight="bold">
            {song.name}
          </Text>
          <Box _hover={{ transform: "scale(1.05)" }} mr="10px">
            {hovered ? (
              <Box>
                {isPlaying && activeSongData.name === song.name ? (
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
            ) : null}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SongCard;
