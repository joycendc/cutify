import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  MdFavoriteBorder,
  MdCast,
  MdCropSquare,
  MdPlayCircle,
  MdShuffle,
  MdRepeat,
  MdSkipPrevious,
  MdSkipNext,
  MdSearch,
  MdPlaylistPlay,
  MdDevices,
  MdOutlineOpenInFull,
  MdOutlineCampaign,
} from "react-icons/md";

const BottomBar = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      bg="#111"
      h="100%"
      color="gray"
      p="10px"
    >
      <Flex
        h="100%"
        gap="20px"
        flex={1}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Center border="1px solid gray">
          <Image src="/" alt="Album" width={75} height={75} />
        </Center>
        <Box>
          <Text color="#fff" cursor="pointer">
            Title title title
          </Text>
          <Text fontSize="14px">Subtitle</Text>
        </Box>
        <Flex alignItems="center" gap="10px">
          <MdFavoriteBorder size={20} />
          <MdCast size={20} />
        </Flex>
      </Flex>
      <Flex
        flexDir="column"
        h="100%"
        w="100%"
        alignItems="center"
        flex={2}
        justifyContent="space-between"
      >
        <Flex alignItems="center" gap="15px">
          <MdShuffle size={20} />
          <MdSkipPrevious size={20} color="#fff" />
          <MdPlayCircle size={50} color="#fff" />
          <MdSkipNext size={20} color="#fff" />
          <MdRepeat size={20} />
        </Flex>
        <Flex w="60%" alignItems="center" gap="10px">
          <Text fontSize="12px">0:00</Text>
          <Slider
            aria-label="slider-ex-1"
            colorScheme="gray"
            defaultValue={30}
            borderRadius="10px"
          >
            <SliderTrack bg="gray.800">
              <SliderFilledTrack bg="gray.200" />
            </SliderTrack>
            <SliderThumb boxSize={0}>
              <Box color="tomato" as={null} />
            </SliderThumb>
          </Slider>
          <Text fontSize="12px">0:00</Text>
        </Flex>
      </Flex>
      <Flex flex={1} alignItems="center" justifyContent="flex-end">
        <Flex gap="10px">
          <MdSearch size={20} />
          <MdPlaylistPlay size={20} />
          <MdDevices size={20} />
        </Flex>
        <Box w="15px" />
        <Flex alignItems="center" gap="5px">
          <MdOutlineCampaign size={20} />
          <Slider
            aria-label="slider-ex-1"
            colorScheme="gray"
            defaultValue={30}
            w={100}
            borderRadius="10px"
          >
            <SliderTrack bg="gray.800">
              <SliderFilledTrack bg="gray.200" />
            </SliderTrack>
            <SliderThumb boxSize={1} />
          </Slider>
          <MdOutlineOpenInFull size={20} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BottomBar;
