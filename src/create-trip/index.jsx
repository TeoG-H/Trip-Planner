import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
  const handleSelect = (place) => {
    if (!place) return;

    const description = place.label;
    const lat = place.value.geometry.location.lat();
    const lng = place.value.geometry.location.lng();

    console.log("City:", description);
    console.log("Lat:", lat);
    console.log("Lng:", lng);
  };

  return (
    <div className="mt-10 px-5 max-w-4xl mx-auto">
      <h2 className="font-bold text-3xl">
        Tell us your travel preference
      </h2>

      <p className="mt-3 text-gray-400">
        spune ce obiective vrei sa vezi ce te pasioneaza
      </p>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">
          What is your destination?
        </h2>

        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
          selectProps={{
            placeholder: "Search a city...",
            onChange: handleSelect,
          }}
        />
      </div>
    </div>
  );
}

export default CreateTrip;
