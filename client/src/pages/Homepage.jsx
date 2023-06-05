import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loading_animation from "../assets/loading.json";
import Lottie from "lottie-react";
import '../styles/Background.css';
import { getUserData } from "../http";
import { Manufacturer } from "../components/manufacturer/Manufacturer";

export const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken){
      getUserData(storedToken).then(res=>{
        setIsLoading(false);
        if(res.status === 200) {
          setData(res.data);
        }
        else navigate('/auth')
      })
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
          {
            data.isManufacturer && <Manufacturer data={data}/> 
          }
        </div>
        </>
      )}
    </>
  );
};
