"use client";
import { Download, Eye } from 'lucide-react'
import { useState } from 'react'

export default function page() {
  const [activeTab,setActiveTab] = useState(1);

  return (

    <main className="flex-1 overflow-x-hidden overflow-y-auto  p-6">

      <div className="dark:bg-gray-7 bg-white rounded-md p-3 my-4">
        <h1 className="text-2xl font-bold mb-4">Bill Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Bills Summary</p>

        {/* Bill Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { title: "Active Bills", value: "350", change: "+10% from yesterday" },
            { title: "Paid Bills", value: "250", change: "+8% from yesterday" },
            { title: "Cancelled Bills", value: "9", change: "+2% from yesterday" },
            { title: "Pending Bills", value: "12", change: "+3% from yesterday" },
          ].map((stat, index) => (
            <div key={index} className="bg-white-shade-1 dark:bg-gray-8 p-6 rounded-lg shadow">
              <h2 className="text-4xl font-bold mb-2">{stat.value}</h2>
              <p className="text-black dark:text-white-shade-1 mb-1 text-[18px] font-medium">{stat.title}</p>
              <p className="text-sm text-black dark:text-white text-[12px] font-medium">{stat.change}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Summary Table */}
      <div className="dark:bg-gray-7 bg-white  rounded-lg shadow p-6 overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="mb-4 flex flex-row gap-10">
            <h2 onClick={() => setActiveTab(1)} className={`cursor-pointer text-[20px] font-semibold border-b-[3px] pb-2 ${activeTab == 1? 'border-black dark:border-white' : 'border-transparent dark:border-transparent'}`}>Bill Summary</h2>
            <h2 onClick={() => setActiveTab(2)} className={`cursor-pointer text-[20px] font-semibold border-b-[3px] pb-2 ${activeTab == 2? 'border-black dark:border-white' : 'border-transparent dark:border-transparent'}`}>AI Activity Feed</h2>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <th className="pb-4">Transaction ID</th>
              <th className="pb-4">Action Performed</th>
              <th className="pb-4">Due Date</th>
              <th className="pb-4">Date Created</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-4">Campaign Name</td>
                <td className="py-4">
                  <span className={`inline-flex items-center ${index % 3 === 1 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${index % 3 === 1 ? 'bg-red-600 dark:bg-red-400' : 'bg-green-600 dark:bg-green-400'}`}></span>
                    {index % 3 === 1 ? 'Payment Cancelled' : 'Payment Successful'}
                  </span>
                </td>
                <td className="py-4">24 Jan 2024</td>
                <td className="py-4">18 Apr 2024</td>
                <td className="py-4">$50</td>
                <td className="py-4">
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <Eye className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>


  )
}