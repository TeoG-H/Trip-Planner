import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions } from "@/constants/options";
import { SelectTravelesList } from "@/constants/options";
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


function CreateTrip() {


  const [place, setPlace] = useState();
  const [openDailog, setOpenDailog] = useState(false);
  const [formData, setFormData] = useState({});      // prima data datele sunt reprezentate de un obiect gol
  const [loading, setLoading]=useState(false);

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


  const OnGenerateTrpi = async () => {

      const user = localStorage.getItem("user"); //citeste de la key user

      if (!user) {
        setOpenDailog(true);
        return;
      }

      if ( formData?.noOfDays > 5 || !formData?.location || !formData?.budget || !formData?.noOfDays || !formData?.noOfPeople) 
      {
        toast("Please fill all details");
        return;
      }

      setLoading(true);
      // fac promptul final inlocuind in promptul din const detalii specifice
      const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location?.label)
        .replace("{totalDays}", formData?.noOfDays)
        .replace("{traveler}", formData?.noOfPeople)
        .replace("{budget}", formData?.budget);

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

    <div className="mt-10 px-5 max-w-4xl mx-auto gap-10 mb-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preference
      </h2>

      <p className="mt-3 text-gray-400">
        spune ce obiective vrei sa vezi ce te pasioneaza
      </p>

      <div className="mt-10 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
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

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input placeholder="ex.3" type="number" onChange={(e) => handleInputChange("noOfDays", e.target.value)}/>
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          What is your budget?
        </h2>

        <div className="grid grid-cols-3 gap-5 mt-5">
          {/*SelectBudgetOptions este o lista de obiecte din const, pt fiecare obiect returneaza cate un <></>*/}
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} onClick={ () => handleInputChange("budget", item.title /*item.title din constante*/ ) }
              className={`p-4 border cursor-pointer rounded-xl hover:shadow-lg ${formData?.budget === item.title && "shadow-2xl border-black"}`}  
                //daca este selectat (adica se afla in formData) ii aplica shadow-2xl
                // acel && e echivalenul la if true
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
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

      <div className="mt-10 justify-end flex">
         {/* butonul nu mai este activ cand procesul este in loading*/}
        <Button disable={loading}  onClick={OnGenerateTrpi}>
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
  );
}

export default CreateTrip;
