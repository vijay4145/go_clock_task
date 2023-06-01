import { Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";

export const Login = ({ setIsLoggingIn }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const TogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
    <div className="flex flex-col gap-5">

      <div>
        <h1 className="text-4xl font-semibold">Login</h1>
        <p>After Logging in you can upload and see images</p>
      </div>
      <form action="" className="flex flex-col gap-4">
        <TextField fullWidth label="UserId" variant="outlined" />

        <span className="flex flex-col gap-1">
          <TextField
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
          <span className="flex gap-1 items-center">
            <Checkbox /> <p>Remember Me</p>
          </span>
        </span>

        <span className="flex justify-center">
          <button className="bg-blue-500 px-3 py-2 text-white rounded-lg hover:shadow-lg hover:bg-blue-600">
            Sign In
          </button>
        </span>
      </form>
      <span className="flex gap-1">
        <p>New member?</p>
        <div
          onClick={() => setIsLoggingIn(false)}
          className="hover:underline text-green-700 cursor-pointer"
        >
          Create a account
        </div>
      </span>
      </div>
    </>
  );
};
