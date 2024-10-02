import React from 'react'


const EmployeeDetailsCard = () => {
    return (
        <div className="w-full  rounded-lg overflow-hidden glasss-effect relative md:h-[23rem]">
            <div className="p-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1 relative">
                    <h3 className="text-[26px] font-semibold mb-4 md:whitespace-pre">Meet John, The Sales Manager</h3>
                    <img src="/images/users/user-2.png" alt="John" className="rounded-lg w-full object-cover relative -bottom-[1.85rem]" />
                </div>


                <div className="flex-1 space-y-4">
                    <div className="glasss-effect p-4 rounded-lg relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[18px] font-semibold">New Leads</span>
                            <span className='block p-2 rounded-full black-radial'>
                                <img src='/images/icons/mdi_leads-outline.png' className='w-5' />
                            </span>
                        </div>
                        <div className='flex flex-row items-center w-full gap-5'>
                            <div className='flex-1'>
                                <h2 className="text-[32px] font-bold">574</h2>
                                <div className='flex flow-row items-center'>
                                    <span className='block p-2 rounded-full bg-green-100/15'>
                                        <img src='/images/icons/arrow.png' className='w-3' />
                                    </span>
                                    <p className="text-[12px] font-normal ml-2 text-white"><span className='tetx-[14px]'>12%</span> past 30 days</p>
                                </div>
                            </div>
                            <div className="mt-4 flex-1">
                                <img src='/images/icons/simple-chart.png' className='w-full h-[3rem]' />
                            </div>

                        </div>


                    </div>

                    <div className="glasss-effect p-4 rounded-lg relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[18px] font-semibold">Mails Sent</span>
                            <span className='block p-2 rounded-full black-radial'>
                                <img src='/images/icons/mdi_email-fast-outline.png' className='w-5' />
                            </span>
                        </div>
                        <div className='flex flex-row items-center w-full gap-5'>
                            <div className='flex-1'>
                                <h2 className="text-[32px] font-bold">2385</h2>
                                <div className='flex flow-row items-center'>
                                    <span className='block p-2 rounded-full bg-green-100/15'>
                                        <img src='/images/icons/arrow.png' className='w-3' />
                                    </span>
                                    <p className="text-[12px] font-normal ml-2 text-white"><span className='tetx-[14px]'>12%</span> past 30 days</p>
                                </div>
                            </div>
                            <div className="mt-4 flex-1">
                                <img src='/images/icons/simple-chart.png' className='w-full h-[3rem] ' />
                            </div>

                        </div>


                    </div>

                </div>
                <div className="flex-1 relative">
                    <div className="glasss-effect p-4 rounded-lg h-full">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[18px] font-semibold">Sales Campaign</span>
                            <span className='block p-2 px-3 rounded-full black-radial'>
                                <img src='/images/icons/dollar.png' className='w-3' />
                            </span>
                        </div>
                        <div className='flex flow-row items-end'>
                            <h2 className="text-[32px] font-bold">+65%</h2>
                            <p className="text-[12px] font-normal ml-2 text-white mb-3">past 30 days</p>
                        </div>
                        <div className="mt-4 w-full relative">
                                <img src='/images/icons/full-chart.png' className='w-full h-[10rem]' />

                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetailsCard