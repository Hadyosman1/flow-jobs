import { forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";
import citiesList from "@/lib/cities-list";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(
  ({ onLocationSelected, ...props }, ref) => {
    const [locationSearch, setLocationSearch] = useState("");
    const [isFocus, setIsFocus] = useState(false);

    const cities = useMemo(() => {
      if (locationSearch.trim() === "") return [];

      const searchWords = locationSearch.split(" ");

      return citiesList
        .map(
          ({ name, country, subcountry }) =>
            `${name}, ${subcountry}, ${country}`,
        )
        .filter((city) => {
          return (
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            )
          );
        })
        .slice(0, 5);
    }, [locationSearch]);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          type="search"
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />

        {isFocus && locationSearch.trim() !== "" && (
          <ul className="absolute z-20 w-full divide-y rounded-b-xl border-x border-b bg-background shadow-xl">
            {cities.length === 0 ? (
              <p className="p-3 text-muted-foreground">
                There is no results...
              </p>
            ) : (
              cities.map((city) => (
                <li className="" key={city}>
                  <button
                    type="button"
                    onPointerDown={() => {
                      setLocationSearch("");
                      onLocationSelected(city);
                    }}
                    className="w-full p-3 text-start hover:bg-muted/60"
                  >
                    {city}
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    );
  },
);

LocationInput.displayName = "LocationInput";

export default LocationInput;
