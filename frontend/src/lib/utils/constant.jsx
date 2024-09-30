export const headers = [
  { key: "name", label: "Movie Name" },
  {
    key: "img",
    label: "Image",
    render: (row) => (
      <img src={row.img} alt={row.name} className="w-16 h-auto" />
    ),
  },
  { key: "year", label: "Year" },
  { key: "genre", label: "Genre", render: (row) => row.genre.join(", ") },
  { key: "rating", label: "Rating" },
];
