import { Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { CgUser } from "react-icons/cg";
import { postUserDetails } from "../../http";
import loading_animation from '../../assets/loading.json';
import Lottie from 'lottie-react';
import { MySnackbar } from  '../MySnackbar';

export const SignUp = ({ setIsLoggingIn }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const TogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Something went wrong');

  const submitForm = (e)=>{
    e.preventDefault();
    setIsLoading(true);
    let json = {
      name : userName,
      userId,
      password
    }
    postUserDetails(json).then(res=>{
      console.log(res.status);
      if(res.status === 200){
        localStorage.setItem('token', res.data.token);
        window.location.href = '/';
      }else if(res.status === 409){
        setErrorMsg('User Id already exists');
        setIsError(true);
      }else {
        setErrorMsg('Something went wrong');
        setIsError(true);
      }
      setIsLoading(false);
    })
  }
  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-4xl font-semibold">SignUp</h1>
          <p>After SignUp you can upload and see images</p>
        </div>
        {isLoading ?  <Lottie animationData={loading_animation} className="h-36 w-36"/>
        :
        <form onSubmit={submitForm} className="flex flex-col gap-4">
          <TextField
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            type="text"
            label="User Id"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <CgUser />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            fullWidth
            type="text"
            label="User Name"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <AiOutlineUser />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <span className="flex flex-col gap-1">
            <TextField
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              fullWidth
              type={passwordVisible ? "text" : "password"}
              label="Password"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={TogglePasswordVisibility}>
                      {passwordVisible ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </span>

          <span className="flex justify-center">
            <button className="bg-blue-500 px-3 py-2 text-white rounded-lg hover:shadow-lg hover:bg-blue-600">
              Sign Up
            </button>
          </span>
        </form>}
        {!isLoading && <span className="flex gap-1">
          <p>Already a member?</p>
          <div
            onClick={() => setIsLoggingIn(true)}
            className="hover:underline text-green-700 cursor-pointer"
          >
            Login
          </div>
        </span>}
      </div>
      <MySnackbar isOpen={isError} setOpen={setIsError} msg={errorMsg} severity='error'/>
    </>
  );
};
