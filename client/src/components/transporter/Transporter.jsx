import React, { useEffect, useState } from 'react'
import '../../styles/Background.css';
import { SearchBox } from '../SearchBox';
import AOS from 'aos';
import { OrderTable } from '../OrderTable';
import {  getOrderFromMongoForTransporters } from '../../http';

export const Transporter = ({data}) => {
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState(null);
    const [tableDummyData, setTableDummyData] = useState(null);
    useEffect(() => {
      getOrderFromMongoForTransporters(localStorage.getItem('token')).then(res=>{
        console.log(res.data);
        setTableData(res.data);
        setTableDummyData(res.data);;
        setIsLoading(false);
      })
    }, [])

    useEffect(()=>{
        let filteredArray = [];
        console.log(searchText);
        if(searchText === '') setTableDummyData(tableData);
        else {
            filteredArray = tableData.filter((obj) => 
                 obj.order_id.includes(searchText) || obj.to.includes(searchText) || obj.from.includes(searchText)
            );
            setTableDummyData(filteredArray);
        }
    },[searchText])
    
    AOS.init();
  return (
    <>
    <div className='bg4 text-white rounded-2xl p-5 shadow-2xl flex gap-5 flex-col'>
        <h1 className='text-xl font-serif'>Order History :</h1>
        <div className='flex gap-6 flex-col md:flex-row'>
            <SearchBox searchText={searchText} setSearchText={setSearchText}/>
        </div>
        <div id='orderList'>
          <OrderTable isLoading={isLoading} data={tableDummyData} isManufacturer={false}/>
        </div>
    </div>
    </>
  )
}
