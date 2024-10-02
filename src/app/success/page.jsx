import React from 'react'
import { Check } from 'lucide-react'
import Link from 'next/link';



const employee = { name: "Zeeshan Raza", expertise: "Frontend Developer" }

const page = ({ searchParams }) => {

    const name = searchParams.name;
    const payment_intent = searchParams.payment_intent
    return (
        <div className="bg-[url('/images/black-bg-horizontal.png')] w-full bg-cover bg-center bg-no-repeat text-white py-12 px-12 min-h-screen">
            <div className="text-center space-y-2  flex items-center flex-col">
                <img src='/images/logo/logo-white.png' className='mb-3' />
                <h2 className="text-[24px] font-bold">Congratulations!</h2>
                <p className="text-[18px] text-white font-normal">You've successfully hired one of our best AI employee. You're all set to push your business to the next level!</p>
            </div>

            <div className='max-w-[70rem] mx-auto mt-5'>
                <hr className='bg-gray-1 mb-5 w-[80%] mx-auto' />

                <div className='flex items-center mx-auto w-fit relative h-[31rem]'>
                    <div className="flex-none w-[22rem]">
                        <div className="black-linear rounded-l-lg overflow-hidden text-white">
                            <img
                                src={`/images/users/user-3.png`}
                                alt={employee.name}
                                className="w-full h-[16rem] object-cover"
                            />
                            <div className="p-4 space-y-7">
                                <div className="flex flex-row">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-[22px]">{employee.name}</h3>
                                        <p className="text-[13px] font-normal text-green-100 py-2 px-3 rounded-3xl bg-green-100/15 w-[fit-content]">{employee.expertise}</p>
                                    </div>
                                    <div className="flex   flex-1 gap-3 justify-end items-end">
                                        <span className="text-[35px] font-bold">${99}</span>
                                        <span className="text-[12px] font-medium mb-3">/monthly</span>
                                    </div>
                                </div>

                                <p className="text-[15px] font-normal">The passage experienced a surge in popularity during the 1960s.</p>

                                <button className="w-full btn-linear-gradient text-white py-2 rounded-md  transition-colors">
                                    <Link href={'/dashboard'}>
                                        Redirect to Dashboard
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='w-[21rem] bg-white h-full rounded-r-lg  flex-col items-start py-5 px-8 hidden md:flex'>
                        <h2 className='text-gray-5 text-[20px] font-semibold'>Features that you would get: </h2>
                        <ul className='space-y-3 mt-5'>
                            <li className='flex items-center gap-3'>
                                <span className='p-1 text-white btn-linear-gradient rounded-full text-sm'><Check size={15} /></span>
                                <span className='text-gray-5 text-[16px]'>Up to 250,000 tracked visits</span>
                            </li>
                            <li className='flex items-center gap-3 ml-0'>
                                <span className='p-1 text-white btn-linear-gradient rounded-full text-sm'><Check size={15} /></span>
                                <span className='text-gray-5 text-[16px]'>Normal support</span>
                            </li>
                            <li className='flex items-center gap-3 ml-0'>
                                <span className='p-1 text-white btn-linear-gradient rounded-full text-sm'><Check size={15} /></span>
                                <span className='text-gray-5 text-[16px]'>Up to 3 team members</span>
                            </li>
                            <li className='flex items-center gap-3 ml-0'>
                                <span className='p-1 text-white btn-linear-gradient rounded-full text-sm'><Check size={15} /></span>
                                <span className='text-gray-5 text-[16px]'>Up to 250,000 tracked visits</span>
                            </li>
                            <li className='flex items-center gap-3 ml-0'>
                                <span className='p-1 text-white btn-linear-gradient rounded-full text-sm'><Check size={15} /></span>
                                <span className='text-gray-5 text-[16px]'>Normal support</span>
                            </li>
                            <li className='flex items-center gap-3 ml-0'>
                                <span className='p-1 text-white btn-linear-gradient rounded-full text-sm'><Check size={15} /></span>
                                <span className='text-gray-5 text-[16px]'>Up to 3 team members</span>
                            </li>
                            <li className='flex items-center gap-3 ml-0'>
                                <span className='p-1 text-white btn-linear-gradient rounded-full text-sm'><Check size={15} /></span>
                                <span className='text-gray-5 text-[16px]'>Up to 250,000 tracked visits</span>
                            </li>
                            <li className='flex items-center gap-3 ml-0'>
                                <span className='p-1 text-white btn-linear-gradient rounded-full text-sm'><Check size={15} /></span>
                                <span className='text-gray-5 text-[16px]'>Normal support</span>
                            </li>
                            <li className='flex items-center gap-3 ml-0'>
                                <span className='p-1 text-white btn-linear-gradient rounded-full text-sm'><Check size={15} /></span>
                                <span className='text-gray-5 text-[16px]'>Up to 3 team members</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page