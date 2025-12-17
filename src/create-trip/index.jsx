import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions } from "@/constants/options";
import { SelectTravelesList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { generateTrip } from "@/service/AIModal";


function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData]=useState([]);

  const handleInputChange=(name, value)=>{
    if(name=='noOfDays'&&value>5 )
    {
      console.log("please enter a smaller number")
      return;
      
    }
      setFormData({...formData, [name]:value })

  }

  const OnGenerateTrpi= async()=>{
    if(formData?.noOfDays>5 || !formData?.location || !formData?.budget || !formData?.noOfDays ||
      !formData?.noOfPeople)
    {
      toast("Please fill all details")
      return;
    }
    
    const FINAL_PROMPT=AI_PROMPT
    .replace(' {location}', formData?.location?.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.noOfPeople)
    .replace('{budget}', formData?.budget)
    console.log(FINAL_PROMPT);

    const result = await generateTrip(FINAL_PROMPT);
    console.log(result);
  }

  useEffect(()=>{console.log(formData)}, [formData])

  return (
    <div className="mt-10 px-5 max-w-4xl mx-auto gap-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preference
      </h2>

      <p className="mt-3 text-gray-400">
        spune ce obiective vrei sa vezi ce te pasioneaza
      </p>

      <div className="mt-10 flex flex-col  gap-10 ">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination?
          </h2>

          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location',v) }
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip ?</h2>
          <Input placeholder={'ex.3'} type="number"
          onChange={(e)=>handleInputChange('noOfDays', e.target.value)} />
        </div>

      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">
          What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} 
            onClick={()=>handleInputChange('budget', item.title)}
            className={`p-4 border cursor-pointer rounded-xl hover:shadow-lg  
            ${formData?.budget==item.title&&'shadow-2xl border-black'}`}>
              <h2 className="text 4-xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with ?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div key={index} 
            onClick={()=>handleInputChange('noOfPeople', item.people)}
            className={`p-4 border cursor-pointer rounded-xl hover:shadow-lg  
            ${formData?.noOfPeople==item.people&&'shadow-2xl border-black'}`}>
              <h2 className="text 4-xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 justify-end flex">
        <Button onClick={OnGenerateTrpi}>
        Genereate Trip
      </Button>
      </div>
      
    </div>
  );
}

export default CreateTrip;
