import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from "react-icons/md";

export const menu = [
  {
    name: "Account",
    hasIcon: true,
    route: "/account",
  },
  {
    name: "Profile",
    hasIcon: false,
  },
  {
    name: "Upgrade to Premium",
    hasIcon: true,
  },
  {
    name: "Logout",
    hasIcon: false,
  },
];

export const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

export const otherMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];
