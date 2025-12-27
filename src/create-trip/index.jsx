import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectTravelesList, SelectBudgetOptions, SelectPreference, SelectTransportMode,SelectTravelPace,SelectTravelerType } from "@/constants/options";
import { Button } from "@/components/ui/button";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { generateTrip } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "@/service/firebaseConfig";
import { useNavigate} from "react-router-dom";
import Header from "@/components/custom/Header";
import RevealOnScroll from "./RevealOnScroll";
import { Toaster } from "sonner";



function CreateTrip() {


  const [place, setPlace] = useState();
  const [openDailog, setOpenDailog] = useState(false);
  const [formData, setFormData] = useState({travelPreference: []});      // prima data datele sunt reprezentate de un obiect gol
  const [loading, setLoading]=useState(false);
  const heroRef = RevealOnScroll();
const destinationRef = RevealOnScroll();
const daysRef = RevealOnScroll();
const budgetRef = RevealOnScroll();
const travelersRef = RevealOnScroll();
const transportRef = RevealOnScroll();
const paceRef = RevealOnScroll();
const typeRef = RevealOnScroll();
const preferenceRef = RevealOnScroll();
const buttonRef = RevealOnScroll();


  const navigate=useNavigate();
  // e apelat la orice input
  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value > 5) {
      console.log("please enter a smaller number");
      return;
    }
    // adaug cate un nou element la obiect (care initial e gol)
    setFormData({ ...formData, [name]: value });// seteaza data ca fiind un obiect nou {copie inf din obiectul vechi si ii adaug avaloarea}
  };

  const handleMultiSelect = (name, value) => {
  setFormData((p) => {
    const currentValues = p[name] || [];

    //daca in lista este inclusa valoarea cu care apelez functia atunci o elemin daca nu o adaug
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value) // scoate
      : [...currentValues, value]; // adauga

    return {
      ...p,
      [name]: updatedValues,
    };
  });
};

  const OnGenerateTrpi = async () => {

      const user = localStorage.getItem("user"); //citeste de la key user

      if (!user) {
        setOpenDailog(true);
        return;
      }

      if ( formData?.noOfDays > 5 || !formData?.location || !formData?.budget || !formData?.noOfDays || !formData?.noOfPeople || 
        !formData?.transportMode  || !formData?.travelPace || !formData?.travelType) 
      {
        toast("Please fill all details");
        return;
      }

      setLoading(true);
      // fac promptul final inlocuind in promptul din const detalii specifice
      const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData.location.label)
      .replace("{totalDays}", formData.noOfDays)
      .replace("{traveler}", formData.noOfPeople)
      .replace("{budget}", formData.budget)
      .replace("{transportMode}", formData.transportMode || "No specific transportation preference.")
      .replace("{travelPace}", formData.travelPace || "Balanced travel pace.")
      .replace("{travelerType}", formData.travelType || "General traveler.")
      .replace("{travelPreference}",formData.travelPreference?.length ? formData.travelPreference.join(", ") : "No specific preferences.");

    // console.log(FINAL_PROMPT);

      const result = await generateTrip(FINAL_PROMPT);
      console.log(result);
      setLoading(false);
      SaveAiTrip(result)
  };

  const SaveAiTrip=async(TripData)=>{
    setLoading(true);
    const user=JSON.parse(localStorage.getItem('user'));
    const documentId=Date.now().toString()


    const cleanJson = TripData
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

    //linia asta imi spune in ce baza de date o salvez, in ce colectie si numele documentului din colectie si datele din document
  await setDoc(doc(db, "AITrips", documentId), {
   userSelection:formData,
   tripData:JSON.parse(cleanJson),
   userEmail:user?.email,
   id:documentId



});
setLoading(false);
navigate('/view-trip/'+documentId)


  }

  //afiseaza n consola datel de fiecare data cand se modifica
  useEffect(() => { console.log(formData);}, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        OnGenerateTrpi();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

    {/* Gradient principal: alb în centru, albastru pal pe margini */}
    <div
      
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background: `
          radial-gradient(
            circle at center,
            #ffffff 0%,
            #ffffff 45%,
            #eaf7fb 70%,
            #dff2f8 100%
          )
        `
      }}
    />
    <Toaster/>
    {/* Glow discret stânga sus */}
    <div className="pointer-events-none absolute -top-48 -left-48 w-[600px] h-[600px]
      bg-[#5fd3e6]/20 rounded-full blur-[120px] -z-10" />

    {/* Glow discret dreapta jos */}
    <div className="pointer-events-none absolute -bottom-48 -right-48 w-[600px] h-[600px]
      bg-[#5fd3e6]/20 rounded-full blur-[120px] -z-10" />

    <Header/>
    
    <div ref={heroRef} className="transition-all duration-700 ease-out mt-16 px-8 max-w-5xl mx-auto  mb-10">
      <h2 className="font-extrabold text-5xl md:text-6xl tracking-tight">
       Let’s plan your next adventure
      </h2>

      <p className="mt-5 text-lg text-gray-500 max-w-2xl">
        Fill in the details below to generate a personalized travel plan.
      </p>

      <div className="mt-16 flex flex-col gap-20">
        <div>
          <h2 className="text-2xl my-3 font-bold">
            What is your destination?
          </h2>

          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            /*am o componenta autocomplete la care ii trimit un obiect ce contine locatia si functia care se apeleaza cand clientul selecteaza locatia
               functia seteaza place si apeleaza handlerul pt orice input cu numle location*/ 
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange("location", v);},
            }}
          />
        </div>

        <div ref={daysRef}>
          <h2 className="text-2xl my-3 font-bold">
            How many days are you planning your trip?
          </h2>
          <Input placeholder="ex.3" type="number" onChange={(e) => handleInputChange("noOfDays", e.target.value)}/>
        </div>
      </div>

      <div  ref={budgetRef}>
        <h2 className="text-2xl my-5 font-bold">
          What is your budget?
        </h2>

        <div className="grid grid-cols-3 gap-5 mt-5">
          {/*SelectBudgetOptions este o lista de obiecte din const, pt fiecare obiect returneaza cate un <></>*/}
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} onClick={ () => handleInputChange("budget", item.title /*item.title din constante*/ ) }
              className={`p-6 rounded-2xl border bg-white/80 backdrop-blur-sm
  cursor-pointer transition-all duration-500
  hover:-translate-y-1 hover:shadow-xl
  hover:border-[#5fd3e6] ${formData?.budget === item.title && "border-[#5fd3e6] shadow-2xl bg-[#f5fdff]"}`}  
                //daca este selectat (adica se afla in formData) ii aplica shadow-2xl
                // acel && e echivalenul la if true
            >
              <h2 className="text-4xl mb-4 ">{item.icon}</h2>
              <h2 className="font-semibold text-xl">{item.title}</h2>
              <h2 className="text-sm text-gray-500 mt-1">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div ref={travelersRef}>
        <h2 className="text-2xl my-5 font-bold">
          Who do you plan on traveling with?
        </h2>

        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div key={index} onClick={() => handleInputChange("noOfPeople", item.people) }
              className={`p-4 border cursor-pointer rounded-xl hover:shadow-lg ${ formData?.noOfPeople === item.people && "shadow-2xl border-black"}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div ref={transportRef}>
        <h2 className="text-2xl my-5 font-bold">
          What mode of transportation will you use?
        </h2>

        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTransportMode.map((item, index) => (
            <div key={index} onClick={() => handleInputChange("transportMode", item.aiHint) }
              className={`p-4 border cursor-pointer rounded-xl hover:shadow-lg ${ formData?.transportMode === item.aiHint && "shadow-2xl border-black"}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div ref={paceRef}>
        <h2 className="text-2xl my-5 font-bold"> How would you like to pace your trip? </h2>

        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelPace.map((item, index) => (
            <div key={index} onClick={() => handleInputChange("travelPace", item.aiHint) }
              className={`p-4 border cursor-pointer rounded-xl hover:shadow-lg ${ formData?.travelPace === item.aiHint && "shadow-2xl border-black"}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>


      <div ref={typeRef}>
        <h2 className="text-2xl my-5 font-bold"> Who are you traveling with? </h2>

        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelerType.map((item, index) => (
            <div key={index} onClick={() => handleInputChange("travelType", item.aiHint) }
              className={`p-4 border cursor-pointer rounded-xl hover:shadow-lg ${ formData?.travelType === item.aiHint && "shadow-2xl border-black"}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>


      <div ref={preferenceRef}>
        <h2 className="text-2xl my-5 font-bold"> What type of experiences do you enjoy the most? </h2>

        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectPreference.map((item, index) => (
            <div key={index} onClick={() => handleMultiSelect("travelPreference", item.desc) }
              className={`p-4 border cursor-pointer rounded-xl hover:shadow-lg ${ formData?.travelPreference.includes(item.desc) && "shadow-2xl border-black"}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>







      <div ref={buttonRef} className="mt-10 justify-end flex">
         {/* butonul nu mai este activ cand procesul este in loading*/}
        <Button disable={loading}  onClick={OnGenerateTrpi} 
        className="
    px-10 py-6 rounded-full text-lg font-semibold
    bg-gradient-to-r from-[#2aa7c9] to-[#5fd3e6]
    hover:shadow-[0_20px_40px_rgba(95,211,230,0.35)]
    transition-all duration-300
  ">
           {loading? <AiOutlineLoading3Quarters  className="h-7 w-7 animate-spin"/>: 'Generate Trip' }          
        </Button>
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent className="bg-white text-black">
          <DialogHeader className="flex flex-col items-center gap-4">
            <DialogTitle className="text-xl font-semibold text-black"> Sign in with Google</DialogTitle>
            <DialogDescription asChild>
              <div className="flex flex-col items-center gap-4">
                <img src="/logo.svg" />

                <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                  <FcGoogle className="h-6 w-6" />
                  Sign in with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
}

export default CreateTrip;
