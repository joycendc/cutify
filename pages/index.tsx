import { Box } from "@chakra-ui/layout";

const Home = () => {
  return (
    <Box h="100%" color="#fff">
      <Box px="20px" h="30%" bg="gray.700">
        Head
      </Box>
      <Box p="20px" h="70%" bg="gray.800">
        Body
      </Box>
    </Box>
  );
};
export default Home;
