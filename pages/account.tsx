import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import { MdArrowBack } from "react-icons/md";
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
    <Box h="full" py="30px" px="300px" overflowY="scroll">
      <Box cursor="pointer" onClick={() => router.push("/")} mb="20px">
        <MdArrowBack size="30px" />
      </Box>
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
          {user?.isSubscribed ? (
            <Flex
              w="full"
              bg="gray.400"
              flexDir="column"
              borderRadius="10px"
              my="30px"
              boxShadow="-1px 2px 10px 1px rgba(0,0,0,0.33)"
            >
              <Box py="80px" px="30px">
                <Text color="black" fontSize="5xl" fontWeight="900">
                  Subscribed Plan
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
                  Ad-free music listening
                </Text>
                <Divider color="gray.200" my="30px" />
                <Text color="black" fontSize="xl" fontWeight="bold">
                  P 200
                </Text>
              </Box>
            </Flex>
          ) : (
            <Flex
              w="full"
              bg="gray.400"
              flexDir="column"
              borderRadius="10px"
              my="30px"
              boxShadow="-1px 2px 10px 1px rgba(0,0,0,0.33)"
            >
              <Box py="80px" px="30px">
                <Text color="black" fontSize="5xl" fontWeight="900">
                  Cutify Free
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
                  Free
                </Text>
              </Box>
            </Flex>
          )}
        </Box>
      ) : null}
    </Box>
  );
};

Account.authPage = true;

export default Account;
