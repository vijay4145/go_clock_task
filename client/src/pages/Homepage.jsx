import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Homepage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      // if(storedToken) setIsLogin(true);
      // else 
      navigate('/auth');
    }, [])
  return (
    <>
    Homepage
    </>
  )
}
