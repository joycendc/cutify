import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMe } from "../lib/hooks";

const Account = () => {
  const { user, isLoading: userLoading } = useMe();
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const loadPortal = async () => {
    const response = await fetch(`${baseURL}/api/portal`, {
      method: "GET",
    });
    const data = await response.json();
    router.push(data?.url);
  };

  return (
    <Box h="calc(100vh - 90px)" py="30px" px="150px" overflowY="scroll">
      <Text color="black" fontSize="5xl" fontWeight="bold">
        Account Overview
      </Text>

      {!userLoading ? (
        <Box>
          <Text color="black" fontSize="2xl" fontWeight="bold" my="30px">
            Profile
          </Text>
          <Box>
            <Flex align="center">
              <Text color="gray" flex={1}>
                Name
              </Text>
              <Text color="black" flex={1}>
                {user.firstName} {user.lastName}
              </Text>
            </Flex>
            <Divider color="gray.300" my="15px" />
            <Flex align="center">
              <Text color="gray" flex={1}>
                Email
              </Text>
              <Text color="black" flex={1}>
                {user.email}
              </Text>
            </Flex>
            <Divider color="gray.300" my="15px" />
          </Box>
          <Flex align="center" justify="space-between" my="30px">
            <Text color="black" fontSize="2xl" fontWeight="bold">
              {user?.isSubscribed
                ? `Subscribed: ${user.interval}`
                : "Not subscribed"}
            </Text>
            <Flex
              bg="transparent"
              borderRadius={25}
              mr="5px"
              onClick={loadPortal}
              cursor="pointer"
              px="20px"
              py="10px"
              border="1px solid #666"
              align="center"
              fontWeight="bold"
            >
              Manage Subscription
            </Flex>
          </Flex>
          <Flex
            w="full"
            bg="gray.400"
            flexDir="column"
            borderRadius="10px"
            my="30px"
          >
            <Box py="80px" px="30px">
              <Text color="black" fontSize="5xl" fontWeight="900">
                Cutify Plan
              </Text>
            </Box>
            <Box
              bg="white"
              m="2px"
              py="40px"
              px="30px"
              borderBottomRightRadius="10px"
              borderBottomLeftRadius="10px"
            >
              <Text color="black" fontWeight="400">
                Play music in shuffle mode only, with ads.
              </Text>
              <Divider color="gray.200" my="30px" />
              <Text color="black" fontSize="xl" fontWeight="bold">
                P 699
              </Text>
            </Box>
          </Flex>
        </Box>
      ) : null}
    </Box>
  );
};

export default Account;
