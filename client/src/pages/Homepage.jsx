import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loading_animation from "../assets/loading.json";
import Lottie from "lottie-react";
import '../styles/Background.css';
import { getUserData } from "../http";
import { Manufacturer } from "../components/manufacturer/Manufacturer";
import manufacture_icon from '../assets/manufacturerIcon.png';
import transporter_icon from '../assets/transporterIcon.png';
import { Transporter } from "../components/transporter/Transporter";

export const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const signout = ()=>{
    localStorage.removeItem('token');
    window.location.reload();
  }

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
          <div className="text-white  px-3 py-2 flex justify-between items-center flex-wrap">
            <div className="w-full flex justify-between">
              <h1 className="text-3xl font-bold">ɢᴏ ᴄʟᴏᴄᴋ</h1>
              <button onClick={signout} className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-white px-3 py-2 rounded-lg">Sign Out</button>
            </div>
            {data.isManufacturer ? <div className="flex items-center px-2 bg-blue-50  rounded-lg text-black">
              <img src={manufacture_icon} alt="" className="h-7 w-7"/>
              <span>Manufacturer</span> 
            </div>: <div className="flex items-center px-2 bg-blue-50  rounded-lg text-black">
              <img src={transporter_icon} alt="" className="h-7 w-7"/>
              <span>Transporter</span> 
            </div>
            }
          </div>
          {
            data.isManufacturer ? <Manufacturer data={data}/> : <Transporter data={data}/> 
          }
        </div>
        </>
      )}
    </>
  );
};
