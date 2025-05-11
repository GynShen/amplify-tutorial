import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";

function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();
  return (
    <div className="flex space-x-2 ml-3">
      <Input
        type="text"
        placeholder="Enter book name"
        className="text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        variant="outline"
        className="text-sm"
        onClick={() => {
          navigate(`/search/${query}`);
        }}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
