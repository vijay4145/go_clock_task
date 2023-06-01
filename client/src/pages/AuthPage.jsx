import React, { useState } from "react";
import "../styles/Background.css";
import Lottie from "lottie-react";
import storage_animation from "../assets/storage_animation.json";
import { Login } from "../components/auth/Login";
import { SignUp } from "../components/auth/SignUp";
import AOS from 'aos';
import "aos/dist/aos.css";

export const AuthPage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  AOS.init({
    duration: 800
  });
  return (
    <>
      <div className="bg1 w-screen h-screen" />

      <div className=" w-screen min-h-screen flex justify-center items-center ">
        <div data-aos="zoom-in" className="grid md:grid-cols-2 px-10 py-10 gap-10  box-shadow rounded-2xl bg-white box-shadow">
          <section className="flex flex-col gap-5">
            {isLoggingIn && <div data-aos="flip-left"> <Login setIsLoggingIn={setIsLoggingIn} /></div>}
            {!isLoggingIn && <div data-aos="flip-right"><SignUp setIsLoggingIn={setIsLoggingIn}/></div>}
          </section>

          <section className="">
            <Lottie
              animationData={storage_animation}
              className="w-full h-auto"
            />
          </section>
        </div>
      </div>
    </>
  );
};
