import { Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { CgUser } from "react-icons/cg";
import { login } from "../../http";
import { MySnackbar } from "../MySnackbar";

export const Login = ({ setIsLoggingIn }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const TogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Something went wrong");

  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let json = {
      userId,
      password,
    };

    login(json).then((res) => {
      if (res.status === 404) {
        setErrorMsg("User not found");
        setIsError(true);
      } else if (res.status === 401) {
        setErrorMsg("Invalid Password");
        setIsError(true);
      } else if (res.status === 400) {
        setErrorMsg("Something went wrong");
        setIsError(true);
      } else if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      }
    });
  }

    return (
      <>
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-4xl font-semibold">Login</h1>
            <p>After Logging in you can upload and see images</p>
          </div>
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

            <span className="flex flex-col gap-1">
              <TextField
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
                        {passwordVisible ? (
                          <MdVisibility />
                        ) : (
                          <MdVisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
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
        <MySnackbar isOpen={isError} setOpen={setIsError} msg={errorMsg} severity='error'/>
      </>
    );
  };

