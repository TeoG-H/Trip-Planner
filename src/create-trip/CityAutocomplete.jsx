import { useState } from "react";

export default function CityAutocomplete({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async (value) => {
    setQuery(value);
    if (value.length < 3) {
      setResults([]);
      return;
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&city=${value}&limit=5`
    );
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="relative max-w-md">
      <input
        value={query}
        onChange={(e) => search(e.target.value)}
        placeholder="Search city..."
        className="w-full border p-3 rounded"
      />

      {results.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
          {results.map((city) => (
            <li
              key={city.place_id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(city);
                setQuery(city.display_name);
                setResults([]);
              }}
            >
              {city.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
