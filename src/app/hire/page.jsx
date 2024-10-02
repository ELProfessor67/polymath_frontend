'use client'
import { creaetePaymentSessionRequest, getAllBotsRequest } from '@/http/apiCalls';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import EmployeeCard from '@/components/EmployeeCard';
import { useRouter } from 'next/navigation';
import {ChevronRight,ChevronLeft} from 'lucide-react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import EmployeeDetailsCard from '@/components/EmployeeDetailsCard';
import { useScreenSize } from '@/hooks/useScreenSize';



const getEmployeee = async () => {
  try {
    const { data } = await getAllBotsRequest();
 
    return data
  } catch (error) {
    
    return []
  }
}

const layouts = {
  sm: 1,
  md: 2,
  lg: 3,
  xl: 3,
  '2xl': 4,
}

const page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { data:employees, isLoading } = useQuery({ queryKey: ['employees'], queryFn: getEmployeee })
  const router = useRouter();
  const screenSize = useScreenSize();
  const nextRef = useRef(null)
  const prevRef = useRef(null)
  const swiperRef = useRef(null);


  const handlePayment = useCallback((id) => {
    router.push(`/checkout/${id}`);
  }, [router])





  //custom dots
  useEffect(() => {
    const elements = document.querySelectorAll('.bullet');
    elements.forEach((ele) => {
      ele.src = "/images/icons/Indicators.png"
      ele.style.width = "auto"
      ele.style.height = "auto"
    })

    const ele = document.getElementById(`bullet-${activeIndex}`);

    if (ele) {
      ele.src = "/images/icons/logo-icon.png"
      ele.style.width = "20px"
      ele.style.height = "20px"

    }

  }, [activeIndex])


  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // Swiper API's slideTo method
      setActiveCardIndex(index); // Update the active slide state
    }
  };



  if(isLoading){
    return <h1>Loading...</h1>
  }



  return (
    <div className="min-h-screen">
      <div className="bg-[url('/images/black-bg-horizontal.png')] w-full bg-cover bg-center bg-no-repeat text-white py-12 px-12">
        <div className="text-center space-y-2  flex items-center flex-col">
          <img src='/images/logo/logo-white.png' className='mb-3' />
          <h2 className="text-[24px] font-bold">Select Employee</h2>
          <p className="text-[18px] text-white font-normal">Please select the employee you want to buy for your business.</p>
        </div>

        <div className='max-w-[70rem] mx-auto mt-5'>
          <hr className='bg-gray-1 mb-5 w-[80%] mx-auto' />

          <Swiper

            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            // navigation
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                console.log('props', activeIndex)
                // if(className.includes('swiper-pagination-bullet-active')){
                //   return `<span class="${className} !bg-white !opacity-100">${index}</span>`
                // }
                return `<img src="/images/icons/Indicators.png" class="${className} !opacity-100 w-8 !bg-transparent bullet" id="bullet-${index}"/>`
              }
            }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}

          >
            <SwiperSlide>
              <EmployeeDetailsCard />
            </SwiperSlide>
            <SwiperSlide>
              <EmployeeDetailsCard />
            </SwiperSlide>
            <SwiperSlide>
              <EmployeeDetailsCard />
            </SwiperSlide>
            <SwiperSlide>
              <EmployeeDetailsCard />
            </SwiperSlide>
            <SwiperSlide>
              <EmployeeDetailsCard />
            </SwiperSlide>
          </Swiper>

        </div>
      </div>



      <div className="relative w-full mx-auto px-14 py-16">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={layouts[screenSize]}
          onSlideChange={(swiper) => setActiveCardIndex(swiper.activeIndex)}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper; // Store swiper instance in ref
          }}
          activeIndex={3}
          initialSlide={activeCardIndex}
          
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current
          }}

        >
          {employees?.map((employee, index) => (
            <SwiperSlide key={index}>
              <EmployeeCard employee={employee} onClick={() => handlePayment(employee.id)}/>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className='flex items-center justify-between'>
          <button className='p-2 bg-black rounded-full text-white' ref={prevRef}><ChevronLeft /></button>

          <div className="flex justify-center gap-2 mt-8 items-center">
            {Array.from({ length: (employees?.length - layouts[screenSize] + 1) }, (_, i) => i).map((_, index) => (
              index === activeCardIndex ? (
                <img
                  key={index}
                  src='/images/icons/dark-logo-icon.png'
                  className='w-[20px] h-[20px]'
                  alt='active dot'
                />
              ) : (
                <span
                onClick={() => goToSlide(index)}
                  key={index}
                  className='w-2 h-2 rounded-full bg-gray-2'
                />
              )
            ))}
          </div>

          <button className='p-2 bg-black rounded-full text-white' ref={nextRef}><ChevronRight /></button>
        </div>



      </div>


    </div>


  )
}

export default page