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
        <div data-aos="zoom-in" className="flex flex-col-reverse md:grid md:grid-cols-2 m-3 px-10 py-10 gap-4 md:gap-10  box-shadow rounded-2xl bg-white box-shadow">
          <section className="flex flex-col gap-5">
            {isLoggingIn && <div data-aos="flip-left"> <Login setIsLoggingIn={setIsLoggingIn} /></div>}
            {!isLoggingIn && <div data-aos="flip-right"><SignUp setIsLoggingIn={setIsLoggingIn}/></div>}
          </section>

          <section className="w-full justify-center flex">
            <Lottie
              animationData={storage_animation}
              className="w-40 md:w-full h-auto"
            />
          </section>
        </div>
      </div>
    </>
  );
};
