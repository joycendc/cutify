import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  FormLabel,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../lib/mutations";

const AuthForm = ({ mode }: { mode: "signin" | "signup" }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError({ error: true, message: "All fields are required!" });
      return;
    }
    setIsLoading(true);
    const user = await auth(mode, { email, password });
    setIsLoading(false);
    if (user?.id) {
      router.push("/");
    } else {
      setError({ error: true, message: "Something went wrong." });
    }
  };
  return (
    <Box h="100vh" w="100vw" bg="black" color="#fff">
      <Flex
        justify="center"
        align="center"
        h="100px"
        borderBottom="1px solid gray"
      >
        <Image src="/logo.svg" height={100} width={150} />
      </Flex>
      <Flex justify="center" align="center" h="calc(100vh - 100px)">
        <Box p="30px" bg="gray.900" borderRadius="10px" w="350px">
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={error.error}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setError({ error: false, message: "" })}
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setError({ error: false, message: "" })}
              />
              {error.error ? (
                <FormErrorMessage>{error.message}</FormErrorMessage>
              ) : null}
              <Button
                type="submit"
                w="full"
                bg="green.500"
                isLoading={isLoading}
                my="10px"
                _hover={{ bg: "green.400" }}
              >
                {mode}
              </Button>
            </FormControl>
          </form>
          {mode === "signin" ? (
            <Link href="/signup" passHref>
              <Text
                cursor="pointer"
                textAlign="center"
                textDecoration="underline"
                mt="10px"
              >
                No account? Signup
              </Text>
            </Link>
          ) : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
