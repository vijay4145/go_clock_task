import React, { useEffect, useState } from "react";
import AOS from "aos";
import { BiMessageMinus } from 'react-icons/bi'
import { LoadingDataForTable } from "./LoadingDataForTable";

export const OrderTable = ({
  isLoading,
  data,
  isManufacturer,
  setMessageId
}) => {
  AOS.init({
    duration: 400,
  });

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order id
              </th>
              <th scope="col" className="px-6 py-3">
                To
              </th>
              <th scope="col" className="px-6 py-3">
                From
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                {isManufacturer ? 'Transporter':'Manufacturer'}
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading && <LoadingDataForTable/>}
            {isLoading && <LoadingDataForTable/>}
            {!isLoading && data && data.map((ele) => {
              return (
                <>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        {ele.order_id}
                    </th>
                    <td className="px-6 py-4">
                        {ele.to}
                    </td>
                    <td className="px-6 py-4">
                        {ele.from}
                    </td>
                    <td className="px-6 py-4">
                        {ele.quantity}
                    </td>
                    <td className="px-6 py-4">
                        {ele.address}
                    </td>
                    <td className="px-6 py-4">
                        {isManufacturer ? ele.transporter.userId:ele.manufacturer_userId}
                    </td>
                    <td>
                        <div onClick={()=>setMessageId(ele)} className="cursor-pointer px-2 py-2 max-w-fit rounded hover:bg-blue-600 hover:text-white border border-blue-600 text-blue-600 flex items-center gap-1">
                            <BiMessageMinus className="h-5 w-5"/>
                            <button>Message</button> 
                        </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
