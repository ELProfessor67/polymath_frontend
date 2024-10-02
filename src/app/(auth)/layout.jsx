'use client'
import { UserContext } from '@/providers/UserProvider'
import { useRouter } from 'next/navigation';
import React, { useContext, useLayoutEffect } from 'react'

const layout = ({ children }) => {
  const { user, isAuth } = useContext(UserContext);
  const router = useRouter();

  useLayoutEffect(() => {
    if (isAuth == true) {
      if (user?.hire_orders?.length == 0) {
        router.push('/hire');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, isAuth])

  return (
    children
  )
}

export default layout