import React, { useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { useStoreState, useStoreActions } from "easy-peasy";
import {
  MdFavoriteBorder,
  MdPause,
  MdPlayArrow,
  MdEqualizer,
  MdMoreHoriz,
} from "react-icons/md";
import { Image } from "@chakra-ui/react";
import { Td, Tr } from "./styledComponents";
import { formatTime, formatDate } from "../lib/formatter";

const SongItem = ({ song, number, playSong }) => {
  const activeSong = useStoreState((state: any) => state.activeSong);
  const isPlaying = useStoreState((state: any) => state.isPlaying);
  const [hovered, setHovered] = useState(false);
  const changePlayState = useStoreActions(
    (actions: any) => actions.changePlayState
  );

  const handlePlaySong = () => {
    if (activeSong?.id === song.id && isPlaying) {
      changePlayState(false);
    } else {
      playSong(song);
    }
  };

  return (
    <Tr
      key={song.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handlePlaySong}
      cursor="pointer"
    >
      <Td>
        {hovered ? (
          <Box ml="8px">
            {activeSong?.id === song.id && isPlaying ? (
              <MdPause />
            ) : (
              <MdPlayArrow />
            )}
          </Box>
        ) : (
          <Box ml="8px">
            {activeSong?.id === song.id && isPlaying ? (
              <MdEqualizer color="#1ed760" />
            ) : (
              <Text color={activeSong?.id === song.id ? "#1ed760" : "gray"}>
                {number}
              </Text>
            )}
          </Box>
        )}
      </Td>
      <Td>
        <Flex align="center">
          <Image
            mt="5px"
            boxSize="25px"
            src={`https://picsum.photos/400?random=${song?.id}`}
            alt={song.artist.name}
            mr="20px"
          />
          <Box>
            <Text
              lineHeight="16px"
              fontSize="s"
              fontWeight="400"
              color={activeSong?.id === song.id ? "#1ed760" : "white"}
            >
              {song.name}
            </Text>
          </Box>
        </Flex>
      </Td>
      <Td>
        <Text color={hovered ? "white" : "gray.400"} fontSize="xs">
          {song.artist.name}
        </Text>
      </Td>
      <Td>
        <Flex align="center" justify="space-between">
          <Text color="gray.400">{formatDate(song.createdAt)}</Text>
          {hovered ? <MdFavoriteBorder /> : null}
        </Flex>
      </Td>
      <Td>
        <Flex align="center">
          <Text color="gray.400" mr="20px">
            {formatTime(song.duration)}
          </Text>
          {hovered ? <MdMoreHoriz /> : null}
        </Flex>
      </Td>
    </Tr>
  );
};

export default SongItem;
