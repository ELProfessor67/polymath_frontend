"use client"

import React, { useState } from 'react';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  CardElement
} from '@stripe/react-stripe-js';
import { creaetePaymentIntentRequest } from '@/http/apiCalls';
import { useRouter } from 'next/navigation';

export const CheckoutForm = ({ employee }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    if (elements == null || stripe == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError?.message) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // router.push('/success')
    console.log(elements,'elements')



    try {
      const formData = new FormData();
      formData.append('amount', parseFloat(employee.price))
      formData.append('bot_id', employee.id)
      const { data } = await creaetePaymentIntentRequest(formData);
      const { client_secret: clientSecret } = data;

      

      const { error } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        clientSecret,
        confirmParams: {
          return_url: window.location.origin + `/success?name=${employee.name}`,
        },
      });

    

      if (error) {
        setErrorMessage(error.message);
      } else {
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mx-auto mt-10 space-y-5'>

      <div className='flex flex-col gap-1'>
        <label className='text-[14px] font-medium text-gray-2'>Card Number*</label>
        <div className='py-1  px-2 border border-gray-2 rounded-md  flex flex-row items-center'>
          <CardNumberElement className='w-full' required={true}/>
          <img src='/images/icons/visa.png' className='inline-block' />
        </div>



      </div>

      <div className='grid grid-cols-2 gap-5'>
        <div className='flex flex-col gap-1'>
          <label className='text-[14px] font-medium text-gray-2'>Card Number*</label>
          <div className='py-3  px-2 border border-gray-2 rounded-md  flex flex-row items-center'>
            <CardExpiryElement className='w-full' required={true}/>

          </div>



        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-[14px] font-medium text-gray-2'>Card Number*</label>
          <div className='py-3  px-2 border border-gray-2 rounded-md  flex flex-row items-center'>
            <CardCvcElement className='w-full' required={true}/>

          </div>



        </div>
      </div>

      <div className='flex flex-row gap-2 items-center'>
        <input type='checkbox' className='accent-dark-blue mt-1' />
        <p className='text-gray-1 text-[16px]'>Save this credit card for later use</p>
      </div>

      <div className='flex flex-row gap-2 items-center'>
        <input type='checkbox' className='accent-dark-blue mt-1'/>
        <p className='text-gray-1 text-[16px]'>Billing address same as shipping address</p>
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-[14px] font-medium text-gray-2'>Street Address*</label>
        <div className='py-3  px-2 border border-gray-2 rounded-md  flex flex-row items-center'>
          <input type='text' className='w-full outline-none border-none' placeholder='Address'  required/>

        </div>

      </div>



      <div className='grid grid-cols-3 gap-5'>
        <div className='flex flex-col gap-1'>
          <label className='text-[14px] font-medium text-gray-2'>Apt Number</label>
          <div className='py-3  px-2 border border-gray-2 rounded-md  flex flex-row items-center'>
            <input type='text' className='w-full outline-none border-none' placeholder=''  required/>

          </div>
        </div>


        <div className='flex flex-col gap-1'>
          <label className='text-[14px] font-medium text-gray-2'>State</label>
          <div className='py-3  px-2 border border-gray-2 rounded-md  flex flex-row items-center'>
            <input type='text' className='w-full outline-none border-none' placeholder=''  required/>

          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-[14px] font-medium text-gray-2'>Zip</label>
          <div className='py-3  px-2 border border-gray-2 rounded-md  flex flex-row items-center'>
            <input type='text' className='w-full outline-none border-none' placeholder=''  required/>

          </div>
        </div>
      </div>

      {/* <PaymentElement /> */}


      <button type="submit" disabled={!stripe || !elements} className='py-2 px-4 rounded-md text-white my-3 w-full btn-linear-gradient'>
        Make Payment
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};


