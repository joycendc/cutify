import { Flex, Text } from "@chakra-ui/layout";
import { MdReportProblem } from "react-icons/md";

const Error = ({ statusCode }) => {
  return (
    <Flex align="center" justify="center" h="100vh" flexDir="column">
      <MdReportProblem size="90" />
      <Text py="10px" fontWeight="bold" fontSize="md">
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </Text>
    </Flex>
  );
};

Error.authPage = true;

Error.getInitialProps = ({ res, err }) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
