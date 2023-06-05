import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loading_animation from "../assets/loading.json";
import Lottie from "lottie-react";
import '../styles/Background.css';

export const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken){
      setIsLoading(false);
    }
    else navigate("/auth");
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <Lottie animationData={loading_animation} className="h-40 w-40" />
        </div>
      ) : (
        <>
        <div className="flex flex-col bg min-h-screen gap-2">
          <div className="text-white  px-3 py-2">
            <h1 className="text-3xl font-bold">ɢᴏ ᴄʟᴏᴄᴋ</h1>
          </div>
          <div className="bg4 text-white w-full rounded-lg px-5 py-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, necessitatibus.
          </div>
        </div>
        </>
      )}
    </>
  );
};
