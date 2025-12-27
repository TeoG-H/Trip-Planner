import React from 'react'
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="flex-1 h-full grid grid-cols-2">
      <div /> {/* impart pagina in 2 si partea din stanga o las goala */}
      <div className="flex h-full justify-center items-center  px-4 md:px-12"> {/* fiexez in centru pe verticala si orizontala*/}
        
        <div className="flex flex-col gap-10 max-w-2xl text-center "> {/*fixez scrisul si butonul*/}
          
          <h1 className="font-extrabold text-[clamp(1.9rem,3vw,2.6rem)] leading-tight"> {/* leading-tight randurile sa fie mai apropiate iat in clam (ecran mic, cum creste, mare)*/}
            Make your next vacation unforgettable with {" "}
            <span className=" inline-block bg-gradient-to-br 
                from-[#2aa7c9]
                via-[#5fd3e6]
                to-[#2aa7c9]
                bg-[length:200%_100%] bg-clip-text text-transparent animate-[text-shine_4s_ease-in-out_infinite]">
              Tripify
            </span>{/*  bg-clip-text efectul sa fie exact pe litere iar animatia este definita in css */}
          </h1>

          <div className="flex justify-center">
            <Link to="/create-trip">
              <Button className="  relative overflow-hidden px-10 py-4 md:px-16 md:py-6 rounded-xl font-bold text-white text-xl
                  bg-[url('/fundal-apa.png')] bg-cover bg-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group">
                <span className="relative z-10">Get Started</span> {/*textul este deasupra overlayului */}
                <span className=" absolute inset-0  bg-white/20 -translate-x-full   group-hover:translate-x-full transition-transform duration-700  skew-x-12"/>
              </Button>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;


// hover:scale-105 la hover butonul se mareste cu 5%
//active:scale-95  la click se micsoreaza
//absolute inset-0 acopera tot butonul
//bg-white sa aibe putina lumina, translate-x-full porneste din stanga
//skew-x-12 pe diagonala