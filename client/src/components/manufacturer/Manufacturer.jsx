import React, { useEffect, useState } from 'react'
import '../../styles/Background.css';
import { SearchBox } from '../SearchBox';
import { AiOutlinePlus } from 'react-icons/ai';
import AOS from 'aos';
import { AddOrder } from './AddOrder';
import { OrderTable } from '../OrderTable';
import { getOrderFromMongo } from '../../http';

export const Manufacturer = ({data}) => {
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isAddOrderClicked, setIsAddOrderClicked] = useState(false);
    const [tableData, setTableData] = useState(null);
    useEffect(() => {
      getOrderFromMongo(localStorage.getItem('token')).then(res=>{
        console.log(res.data);
        setTableData(res.data);
        setIsLoading(false);
      })
    }, [])
    
    AOS.init();
  return (
    <>
    <div className='bg4 text-white rounded-2xl p-5 shadow-2xl flex gap-5 flex-col'>
        <h1 className='text-xl font-serif'>Order History :</h1>
        <div className='flex gap-6 flex-col md:flex-row'>
            <SearchBox searchText={searchText} setSearchText={setSearchText}/>
            <span onClick={()=>setIsAddOrderClicked(!isAddOrderClicked)} className='flex items-center justify-center bg-blue-500 rounded-lg hover:shadow-lg hover:bg-blue-600 px-3 py-2 shadow-md'>
                <AiOutlinePlus className='h-7 w-7'/>
                <button>Add Order</button>
            </span>
        </div>
        <div id='orderList'>
          <OrderTable isLoading={isLoading} data={tableData}/>
        </div>
    </div>
    {isAddOrderClicked && <div className="absolute top-6">
        <div data-aos='zoom-in' className="fixed top-0 left-0 w-full h-full flex justify-center items-center p-2">
            <AddOrder data={data}/>
        </div>
    </div>}
    </>
  )
}
