import { Box } from "@chakra-ui/layout";
import BottomBar from "./bottomBar";
import Sidebar from "./sidebar";

const PageLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" width="250px" height="full" mb="90px">
        <Sidebar />
      </Box>
      <Box height="full" marginLeft="250px" mb="90px">
        {children}
      </Box>
      <Box position="absolute" bottom="0" height="90px" width="full">
        <BottomBar />
      </Box>
    </Box>
  );
};

export default PageLayout;
