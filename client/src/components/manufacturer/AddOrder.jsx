import {
  Autocomplete,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { addOrderToMongo } from "../../http";
import Lottie from 'lottie-react';
import spinner from '../../assets/loading.json';

export const AddOrder = ({ data }) => {
  const [orderId, setOrderId] = useState('ABC' + data.count);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [address, setAddress] = useState(data.address);
  const [transporter, setTransporter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(data);
  }, []);

  const reloadWindow = () => {
    window.location.reload();
  };

  const addOrder = (e)=>{
    e.preventDefault();
    setIsLoading(true);
    let token = localStorage.getItem('token');
    let json = {
        order_id: orderId,
        to: to,
        from,
        quantity,
        address,
        transporter
    }
    addOrderToMongo(json, token).then(res=>{
        if(res.status === 200){
            window.location.reload();
        }
    })

  }

  return (
    <>
      {isLoading ? <Lottie animationData={spinner} className="w-52 h-52 bg-white"/> :
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
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            type="number"
            label="Quantity"
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
            autoHighlight
            getOptionLabel={(option)=>option.userId}
            onChange={(e,v)=>setTransporter(v)}
            options={data.transporters}
            renderInput={(params) => (
              <TextField {...params} label="Transporter" />
            )}
          />

          <button className="bg-blue-500 text-white px-3 py-2 max-w-fit rounded-lg hover:shadow-lg hover:bg-blue-600">
            Add Order
          </button>
        </form>
      </div>}
    </>
  );
};
