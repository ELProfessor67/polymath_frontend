"use client"
import { getAllEmailsRequest } from '@/http/apiCalls';
import { UserContext } from '@/providers/UserProvider';
import {
  DollarSign, ShoppingCart, Package, Users
} from 'lucide-react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line, Bar, Pie } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)


const visitorData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Visitors',
      data: [65, 59, 80, 81, 56, 55, 40, 70, 75, 80, 90, 100],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
}

const responsesData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Responses',
      data: [12, 19, 3, 5],
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }
  ]
}

const engagementData = {
  labels: ['Organic', 'Paid', 'Ads'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
}

export default function page() {
  const [indexMails, setInboxMails] = useState([]);

  const { user, getUser } = useContext(UserContext);




  const getEmails = useCallback(async (emailList) => {
    try {
      const formData = {
        emails: emailList
      }
      const res = await getAllEmailsRequest(formData);
      setInboxMails(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    if (user?.profiles?.length && user?.profiles?.length != 0) {
      getEmails(user?.profiles?.map((profile) => profile.email));
      setTimeout(() => {
        getEmails(user?.profiles?.map((profile) => profile.email));
      }, 30000);
    }
  }, [user])
  return (

    <main className="flex-1 overflow-x-hidden overflow-y-auto  p-6 space-y-6">


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Sales */}
        <div className="lg:col-span-3 dark:bg-gray-7 bg-white p-4 rounded-lg">
          <h2 className="text-[20px] font-semibold mb-1">Today's Sales</h2>
          <p className='text-[12px] text-[#A0A0A0] font-medium'>Sales Summary</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {[
              { title: "Total Sales", icon: <DollarSign className="h-6 w-6" />, value: "$5k", change: "+10% from yesterday" },
              { title: "Total Order", icon: <ShoppingCart className="h-6 w-6" />, value: "500", change: "+8% from yesterday" },
              { title: "Total Emails", icon: <Package className="h-6 w-6" />, value: indexMails.length, change: "+2% from yesterday" },
              { title: "New Customer", icon: <Users className="h-6 w-6" />, value: "12", change: "+3% from yesterday" },
            ].map((card, index) => (
              <div key={index} className="bg-white-shade-1 dark:bg-gray-8 p-4 rounded-lg">

                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[20px] font-medium">{card.title}</h3>
                  {card.icon}
                </div>
                <p className="text-2xl font-bold mb-1">{card.value}</p>
                <p className="text-xs text-gray-400">{card.change}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className="lg:col-span-2 dark:bg-gray-7 bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Visitor Insights</h3>
            <select className="dark:bg-gray-8 bg-white-shade-1 text-sm rounded-md px-2 py-1 outline-none">
              <option>This month</option>
            </select>
          </div>
          <div className='w-full '>
            <Line
              data={visitorData}
              options={{
                responsive: true,
                scales: {
                  x: { grid: { color: 'rgba(255, 255, 255, 0.1)' } },
                  y: { grid: { color: 'rgba(255, 255, 255, 0.1)' } }
                },
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>


        <div className="dark:bg-gray-7 bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Responses Received</h3>
            <select className="dark:bg-gray-8 bg-white-shade-1 text-sm rounded-md px-2 py-1 outline-none">
              <option>This month</option>
            </select>
          </div>
          <p className="text-4xl font-bold mb-2">257</p>
          <p className="text-sm text-green-400">+2.45% since last month</p>
          <div className='w-full'>
            <Bar
              data={responsesData}
              options={{
                responsive: true,
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: 'rgba(255, 255, 255, 0.1)' } }
                },
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>
      </div>







    </main >


  )
}