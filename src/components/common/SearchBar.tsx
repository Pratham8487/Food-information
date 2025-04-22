import { useState } from "react";
import TextField from "@mui/material/TextField";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [input, setInput] = useState("");

  return (
    <div className="w-full flex justify-center p-4">
      <TextField
        variant="outlined"
        placeholder="Search for food..."
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(input)}
        sx={{ maxWidth: "500px" }}
      />
    </div>
  );
}
