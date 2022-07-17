import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  IconButton,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import {
  MdPlayCircle,
  MdShuffle,
  MdRepeat,
  MdSkipPrevious,
  MdSkipNext,
  MdPauseCircle,
  MdSearch,
  MdPlaylistPlay,
  MdDevices,
  MdVolumeUp,
  MdVolumeDown,
  MdVolumeMute,
  MdVolumeOff,
} from "react-icons/md";
import ReactHowler from "react-howler";
import { useEffect, useState, useRef } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { formatTime } from "../lib/formatter";

const Player = ({ songs, activeSong }) => {
  const isPlaying = useStoreState((state: any) => state.isPlaying);
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  const [isSeekHovered, setIsSeekHovered] = useState(false);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isVolumeSeeking, setIsVolumeSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const [volume, setVolume] = useState(1.0);
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);
  const setActiveSong = useStoreActions(
    (actions: any) => actions.changeActiveSong
  );
  const changePlayState = useStoreActions(
    (actions: any) => actions.changePlayState
  );

  useEffect(() => {
    let timerId;
    if (isPlaying && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current?.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [isPlaying, isSeeking]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  useEffect(() => {}, [isPlaying]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  const setPlayState = (val) => {
    // setPlaying(val);
    changePlayState(val);
  };
  const onShuffle = () => {
    setShuffle((state) => !state);
  };
  const onRepeat = () => {
    setRepeat((state) => !state);
  };
  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
    changePlayState(true);
  };

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) return nextSong();
        return next;
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });
    changePlayState(true);
  };

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  const onVolume = (e) => {
    setVolume(parseFloat(e[0]));
  };

  const getVolumeIcon = () => {
    if (volume === 0.0) return <MdVolumeOff size={20} />;
    if (volume <= 0.5) return <MdVolumeMute size={20} />;
    if (volume >= 0.5 && volume <= 0.75) return <MdVolumeDown size={20} />;
    return <MdVolumeUp size={20} />;
  };

  return (
    <>
      <Flex h="full" w="full" flex={3}>
        <Box>
          <ReactHowler
            playing={isPlaying}
            src={activeSong?.url}
            ref={soundRef}
            onLoad={onLoad}
            onEnd={onEnd}
            volume={volume}
          />
        </Box>
        <Flex
          h="full"
          w="full"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
          pr="150px"
        >
          <Flex alignItems="center" gap="10px" my="5px">
            <IconButton
              outline="none"
              variant="link"
              aria-label="shuffle"
              _hover={{ color: "#fff" }}
              fontSize="22px"
              onClick={onShuffle}
              color={shuffle ? "#1ed760" : "gray"}
              icon={<MdShuffle />}
            />
            <IconButton
              outline="none"
              variant="link"
              aria-label="previous"
              fontSize="28px"
              _hover={{ color: "#fff" }}
              onClick={() => prevSong()}
              icon={<MdSkipPrevious />}
            />
            {isPlaying ? (
              <IconButton
                outline="none"
                variant="link"
                aria-label="previous"
                fontSize="40px"
                color="#fff"
                onClick={() => setPlayState(false)}
                icon={<MdPauseCircle />}
              />
            ) : (
              <IconButton
                outline="none"
                variant="link"
                aria-label="previous"
                fontSize="40px"
                color="#fff"
                onClick={() => setPlayState(true)}
                icon={<MdPlayCircle />}
              />
            )}
            <IconButton
              outline="none"
              variant="link"
              aria-label="next"
              fontSize="28px"
              _hover={{ color: "#fff" }}
              onClick={nextSong}
              icon={<MdSkipNext />}
            />
            <IconButton
              outline="none"
              variant="link"
              aria-label="repeat"
              fontSize="22px"
              _hover={{ color: "#fff" }}
              onClick={onRepeat}
              color={repeat ? "#1ed760" : "gray"}
              icon={<MdRepeat />}
            />
          </Flex>
          <Flex w="80%" alignItems="center" gap="10px" mb="15px">
            <Text color="#bbb" fontSize="11px">
              {formatTime(seek)}
            </Text>
            <RangeSlider
              id="player-slide"
              aria-label="seeker"
              colorScheme="gray"
              borderRadius="10px"
              step={0.1}
              min={0}
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
              onMouseEnter={() => setIsSeekHovered(true)}
              onMouseLeave={() => setIsSeekHovered(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack
                  bg={isSeeking || isSeekHovered ? "#1ed760" : "white"}
                />
              </RangeSliderTrack>
              <RangeSliderThumb
                boxSize={isSeeking || isSeekHovered ? "10px" : "0px"}
                index={0}
              >
                <Box color="tomato" as={null} />
              </RangeSliderThumb>
            </RangeSlider>
            <Text color="#bbb" fontSize="11px">
              {formatTime(duration)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex flex={0.5} alignItems="center" justifyContent="flex-end">
        <Flex gap="10px">
          <MdSearch size={20} />
          <MdPlaylistPlay size={20} />
          <MdDevices size={20} />
        </Flex>
        <Box w="15px" />
        <Flex alignItems="center" gap="8px" mr="10px">
          {getVolumeIcon()}
          <RangeSlider
            id="volume-slide"
            aria-label="volume"
            colorScheme="gray"
            value={[volume]}
            step={0.05}
            onChange={onVolume}
            min={0}
            max={1}
            w={100}
            borderRadius="10px"
            onChangeStart={() => setIsVolumeSeeking(true)}
            onChangeEnd={() => setIsVolumeSeeking(false)}
            onMouseEnter={() => setIsVolumeHovered(true)}
            onMouseLeave={() => setIsVolumeHovered(false)}
          >
            <RangeSliderTrack bg="gray.800">
              <RangeSliderFilledTrack
                bg={isVolumeSeeking || isVolumeHovered ? "#1ed760" : "white"}
              />
            </RangeSliderTrack>
            <RangeSliderThumb
              boxSize={isVolumeSeeking || isVolumeHovered ? "10px" : "0px"}
              index={0}
            >
              <Box color="tomato" as={null} />
            </RangeSliderThumb>
          </RangeSlider>
        </Flex>
      </Flex>
    </>
  );
};

export default Player;
