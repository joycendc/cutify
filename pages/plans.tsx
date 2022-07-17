import { Box, Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { MdCheck } from "react-icons/md";
import plans from "../data/plans";

const Plans = () => {
  return (
    <Box my="60px">
      <Flex flexDir="column" align="center" justify="center" color="black">
        <Text fontSize="4xl" fontWeight="bold">
          Pick your premium
        </Text>
        <Text fontWeight="400">
          Listen without limits on your phone, speaker, and other devices.
        </Text>
      </Flex>
      <Flex
        flexWrap="wrap"
        align="center"
        justify="center"
        gap="18px"
        mt="40px"
      >
        {plans?.map((plan, i) => (
          <Flex
            flexDir="column"
            key={i}
            borderRadius="10px"
            boxShadow="-1px 1px 14px 1px rgba(0,0,0,0.33)"
            p="15px"
            width="270px"
            h="87vh"
          >
            <Box h="40%">
              <Flex flexDir="column" justify="space-between" h="100%">
                <Box>
                  {plan.firstText ? (
                    <Text
                      fontWeight="bold"
                      color="white"
                      fontSize="sm"
                      bg="#2e77d0"
                      p="8px"
                      py="2px"
                      borderRadius="5px"
                      mb="8px"
                    >
                      {plan.firstText}
                    </Text>
                  ) : null}
                  {plan.secondText ? (
                    <Text
                      fontWeight="bold"
                      color="#2e77d0"
                      fontSize="sm"
                      border="1px solid #2e77d0"
                      w="max-content"
                      p="5px"
                      py="2px"
                      borderRadius="5px"
                    >
                      {plan.secondText}
                    </Text>
                  ) : null}
                  <Box color="black">
                    <Text fontSize="2xl" fontWeight="bold">
                      {plan.title}
                    </Text>
                    <Text> {plan.subTitle}</Text>
                    <Text> {plan.accountText}</Text>
                  </Box>
                </Box>

                <hr
                  style={{
                    marginBottom: "15px",
                    borderBottom: "0.1em solid black",
                  }}
                />
              </Flex>
            </Box>
            <Box h="40%">
              {plan.perks.map((perk) => (
                <Flex my="5px" flex={1} gap="10px">
                  <Box>
                    <MdCheck size="25px" />
                  </Box>
                  <Text>{perk}</Text>
                </Flex>
              ))}
            </Box>
            <Flex h="20%" flexDir="column">
              <Button
                w="full"
                py="25px"
                textTransform="uppercase"
                borderRadius="25px"
                _hover={{ transform: "scale(1.05)" }}
                bg="black"
                color="white"
                variant="solid"
              >
                Get Started
              </Button>
              <Flex py="10px">
                <LinkBox mr="5px">
                  <Link href="/" passHref>
                    <LinkOverlay>
                      <Text fontSize="12px" textDecoration="underline">
                        Terms and conditions apply.
                      </Text>
                      {plan.warn ? (
                        <Text fontSize="12px">
                          Offer not available for users who have already tried
                          Premium.
                        </Text>
                      ) : null}
                    </LinkOverlay>
                  </Link>
                </LinkBox>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

Plans.authPage = true;

export default Plans;
