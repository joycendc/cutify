export default function getRandomColor(id) {
  const colors = [
    "blue",
    "red",
    "green",
    "yellow",
    "orange",
    "purple",
    "gray",
    "teal",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
}
