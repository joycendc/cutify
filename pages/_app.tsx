import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StoreProvider } from "easy-peasy";
import PageLayout from "../components/pageLayout";
import "reset-css";
import { store } from "../lib/store";

const MyApp = ({ Component, pageProps }) => {
  const theme = extendTheme({
    colors: {
      gray: {
        100: "#f5f5f5",
        200: "#eeeeee",
        300: "#e0e0e0",
        400: "#bdbdbd",
        500: "#9e9e9e",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
      },
      components: {
        Button: {
          baseStyle: {
            _focus: {
              outline: "none !important",
              boxShadow: "0 0 0 0 rgba(0, 0, 0, 0) !important",
            },
          },
          variants: {
            link: {
              ":focus": {
                outline: "0 !important",
                boxShadow: "0 0 0 0 rgba(0, 0, 0, 0) !important",
              },
            },
          },
        },
      },
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        )}
      </StoreProvider>
    </ChakraProvider>
  );
};

export default MyApp;
