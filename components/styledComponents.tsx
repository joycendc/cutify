import { chakra } from "@chakra-ui/react";

export const Th = chakra("th", {
  baseStyle: {
    position: "sticky",
    top: 65,
    zIndex: 999,
    py: "5px",
    bg: "rgba(0,0,0,0.8)",
    _first: {
      w: "5em",
      textAlign: "right",
      px: "20px",
      pl: "40px",
    },
  },
});

export const Table = chakra("table", {
  baseStyle: {
    width: "100%",
    position: "relative",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },
});

export const Thead = chakra("thead", {
  baseStyle: {
    textAlign: "left",
  },
});

export const Td = chakra("td", {
  baseStyle: {
    py: "10px",
    pr: "20px",
    verticalAlign: "center",

    _first: {
      textAlign: "right",
      px: "20px",
      w: "5em",
      pl: "40px",
    },
  },
});
export const Tr = chakra("tr", {
  baseStyle: {
    transition: "all 0.3s",
    _hover: {
      borderRadius: "10px",
      bg: "rgba(255,255,255,0.1)",
    },
  },
});
