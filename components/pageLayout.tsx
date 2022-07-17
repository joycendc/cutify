import { Box } from "@chakra-ui/layout";
import BottomBar from "./bottomBar";
import Sidebar from "./sidebar";

const PageLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" width="250px" height="100%" mb="100px">
        <Sidebar />
      </Box>
      <Box height="100%" marginLeft="250px" mb="100px">
        {children}
      </Box>
      <Box position="absolute" bottom="0" height="100px" width="100%">
        <BottomBar />
      </Box>
    </Box>
  );
};

export default PageLayout;
