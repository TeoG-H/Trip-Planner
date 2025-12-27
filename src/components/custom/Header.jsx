import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function Header() {

  const user=JSON.parse(localStorage.getItem('user'));
  const [openDailog, setOpenDailog] = useState(false);
  
  useEffect(()=>{
    console.log(user)
  },[])

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
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }; 

  return (
    <div className='h-16 bg-white 
 p-3 shadow-sm flex justify-between items-center px-5'>
        <img src='/logo3.svg' className="h-8 w-auto" />
        <div >
          
          { user? 
          <div className='flex gap-3'>
            <a href='/my-trips'>
          <Button variant="outline" className="border-[#5fd3e6] text-[#5fd3e6] rounded-full hover:bg-[#5fd3e6]/10">My Trips</Button> 
          </a>
          
          <Popover >
            <PopoverTrigger asChild >
              <img src={user?.picture}  alt="profile" className='h-[35px] w-[35px] rounded-full cursor-pointer'/>
            </PopoverTrigger>
            <PopoverContent>
              <h2 onClick={()=>{
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }} className='mt-6 cursor-pointer font-extrabold'>Logout</h2></PopoverContent>
          </Popover>
          </div>
          : <Button className="bg-[#5FD3E6] text-white rounded-full hover:bg-[#48bfd4]" onClick={()=>setOpenDailog(true)}>Sig In</Button>}
          
            
        </div>
        <Dialog open={openDailog} >
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
  )
}

export default Header