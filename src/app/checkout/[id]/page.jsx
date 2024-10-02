"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '@/components/CheckoutForm'
import { STRIPE_PUBLIC_KEY } from '@/constants';
import { getSingleEmployeeRequest } from '@/http/apiCalls';
import EmployeeCheckoutCard from '@/components/EmployeeCheckoutCard';

const page = ({ params }) => {
  const { id } = params;
  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  const [employee, setEmployee] = useState(null);
  const [options, setOptions] = useState(null);  // Store options separately

  // Get employee details
  const getEmployeeData = useCallback(async (id) => {
    try {
      const { data } = await getSingleEmployeeRequest(id);
      setEmployee(data);

      // Safely update options once employee data is available
      setOptions({
        mode: 'payment',
        amount: parseFloat(data?.price_per_month || 10.00) * 100,  // Convert amount to cents for Stripe
        currency: 'usd',
        appearance: {},
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getEmployeeData(id);
  }, [id]);

  if (!employee || !options) {
    // Render a loading state while fetching employee data
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-row h-screen'>
      {/* left  */}
      <div className='w-[60vw] bg-[url("/images/check-bg.png")] bg-cover bg-center hidden md:flex justify-start flex-col items-center'>
        <img src="/images/logo/logo-white.png" alt="Polymaths.AI Logo" width={180} height={60} className="mt-8 mx-auto mb-8" />

        <EmployeeCheckoutCard employee={employee}/>
      </div>

      {/* right */}
      <div className='w-full md:w-[40vw] px-10 py-10 space-y-3'>
        <h2 className='text-dark-blue text-[30px] font-bold'>Checkout</h2>
        <p className='text-gray-1 text-[16px]'>Please provide your billing details for the payment of the employee you selected.</p>
        <div className='h-3'></div>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm employee={employee} />
        </Elements>
      </div>

    </div>
  );
}

export default page;
