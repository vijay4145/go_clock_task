import { Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { CgUser } from "react-icons/cg";

export const SignUp = ({ setIsLoggingIn }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const TogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <>
    <div className="flex flex-col gap-5">

      <div>
        <h1 className="text-4xl font-semibold">SignUp</h1>
        <p>After SignUp you can upload and see images</p>
      </div>
      <form action="" className="flex flex-col gap-4">
        <TextField
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
            Sign Up
          </button>
        </span>
      </form>
      <span className="flex gap-1">
        <p>Already a member?</p>
        <div
          onClick={() => setIsLoggingIn(true)}
          className="hover:underline text-green-700 cursor-pointer"
        >
          Login
        </div>
      </span>
    </div>

    </>
  );
};
