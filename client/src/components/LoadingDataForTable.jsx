import React from 'react'
import { Skeleton } from "@mui/material";

export const LoadingDataForTable = () => {
  return (
    <>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                        <Skeleton
                          variant="rectangular"
                          className="mx-2 w-4 h-6"
                        />
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        <Skeleton variant="rectangular" className="mx-2" />
                      
                    </th>
                    <td className="px-6 py-4">
                        <Skeleton variant="rectangular" className="mx-2" />
                    </td>
                  </tr>
                </>
  )
}
