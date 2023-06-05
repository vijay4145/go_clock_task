import {
  Autocomplete,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export const AddOrder = ({ data }) => {
  const [orderId, setOrderId] = useState('ABC' + data.count);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [address, setAddress] = useState(data.address);
  const [transporter, setTransporter] = useState("");
  const [transporterOptions, setTransporterOptions] = useState([]);

  useEffect(() => {
    let option = [];
    data.transporters.map((ele) => {
      option.push(ele.userId);
    });
    setTransporterOptions(option);
    console.log(data);
  }, []);

  const reloadWindow = () => {
    window.location.reload();
  };

  const addOrder = (e)=>{
    e.preventDefault();

  }

  return (
    <>
      <div className="bg-white p-5 rounded-lg shadow-xl min-w-[40vw]  flex flex-col gap-5 overflow-scroll max-h-[95vh]">
        <div className="flex justify-between">
          <h2 className="text-xl">Add Order.</h2>
          <AiFillCloseCircle
            onClick={reloadWindow}
            className="w-7 h-7 text-red-500 hover:text-red-700"
          />
        </div>
        <form
          onSubmit={addOrder}
          className="flex gap-4 flex-col justify-center items-center"
        >
          <TextField
            required
            value={orderId}
            fullWidth
            type="text"
            label="Order Id"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <span>#</span>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
            fullWidth
            type="text"
            label="To"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <span>#</span>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            fullWidth
            type="text"
            label="From"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <span>#</span>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            type="text"
            label="Address"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <span>#</span>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Autocomplete
            disablePortal
            fullWidth
            required
            onChange={(e,v)=>setTransporter(v)}
            options={transporterOptions}
            renderInput={(params) => (
              <TextField {...params} label="Transporter" />
            )}
          />

          <button className="bg-blue-500 text-white px-3 py-2 max-w-fit rounded-lg hover:shadow-lg hover:bg-blue-600">
            Add Order
          </button>
        </form>
      </div>
    </>
  );
};
