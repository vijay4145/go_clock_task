import React, { useEffect, useState } from 'react'
import { BiMessageAltDetail } from 'react-icons/bi';
import spinner from '../../assets/loading.json';
import Lottie from 'lottie-react';
import { getMessages, sendMessages } from '../../http';
import { IconButton, TextField } from '@mui/material';
import { BsFillSendFill } from 'react-icons/bs';
import { AiFillCloseCircle } from "react-icons/ai";

export const Message = ({to, from}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [oldMessages, setOldMessages] = useState(null);
  const [currMessage, setCurrMessage] = useState('');
  useEffect(() => {
    getMessages(to, localStorage.getItem('token')).then(res=>{
      console.log(res.data);
      setOldMessages(res.data);
      setIsLoading(false);
    })
  }, [])

  const sendMessage = (e)=>{
    e.preventDefault();
    console.log('heel');
    let json = {
      to : to,
      message : currMessage
    }
    sendMessages(json, localStorage.getItem('token')).then(res=>{
      setCurrMessage('');
      window.location.reload();
    })
  }
  
  const reloadWindow = () => {
    window.location.reload();
  };
  
  return (
    <>
    <div className='bg-white p-5 text-black rounded-xl shadow-lg flex flex-col gap-4 min-w-[40vw] max-h-[90vh] overflow-scroll'>
      <div className='flex justify-between'>
        <span className='flex gap-2 items-center'>
          <BiMessageAltDetail className='h-8 w-8'/>
          <h5 className='text-xl'>Messages</h5>
        </span>
        <AiFillCloseCircle
            onClick={reloadWindow}
            className="w-7 h-7 text-red-500 hover:text-red-700"
          />
      </div>
      {isLoading && <Lottie animationData={spinner} className='w-52 h-52'/>}
      <div className='flex flex-col gap-1'>
{!isLoading && oldMessages.map(msg=>{
  return <>
        {msg.from === from && <div id='senderSide' className='flex justify-end'>
          <span className='rounded-xl bg-blue-100 px-3 py-1 max-w-fit'>
            {msg.message}
          </span>
        </div>}
        {msg.from === to && <div id='receiverSide' className='flex'>
          <span className='rounded-xl bg-blue-100 px-3 py-1 max-w-fit'>
            {msg.message}
          </span>
        </div>}
  </>
})}
</div>

      <form onSubmit={sendMessage} className='flex'>

      <TextField
            required
            value={currMessage}
            onChange={(e) => setCurrMessage(e.target.value)}
            fullWidth
            type="text"
            label="Message"
            variant="outlined"
          />
          <IconButton type='submit' size='large' className='hover:text-blue-600'>
            <BsFillSendFill className='h-full w-auto'/>
          </IconButton>
      </form>

      
    </div>
    </>
  )
}
