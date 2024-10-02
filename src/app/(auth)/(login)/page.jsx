'use client'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { loginUserRequest } from "@/http/apiCalls"
import { useContext } from "react"
import { UserContext } from "@/providers/UserProvider"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function page() {

  const { setUser, setIsAuth } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const { data } = await loginUserRequest(formData);
      setUser(data.user);
      setIsAuth(true)
      toast.success(data.message);
      if (data?.user?.hire_orders?.length == 0) {
        router.push('/hire');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.log('Error:', error.message);
      toast.error(error?.message);
    }
  }
  return (

    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Column (Hidden on mobile, visible on lg screens and up) */}
      <div className="hidden w-full bg-[url('/images/black-bg.png')] lg:block lg:w-1/2 ">
        <div className="flex h-full flex-col items-center justify-center p-8 text-white lg:p-12">
          <Image src="/images/logo/logo-white.png" alt="Polymaths.AI Logo" width={180} height={60} className="mb-8" />
          <div className="relative mx-auto w-full max-w-[21rem] overflow-hidden rounded-lg glasss-effect shadow-lg p-6">
            <Image src="/images/users/user-1.png" alt="AI Genius" width={150} height={150} className="w-[11rem] h-[11rem] mx-auto" />
            <div className="p-4 glasss-effect-1 rounded-xl mt-7">
              <h2 className="mb-2 text-h2 font-bold">Meet Our AI Genius!</h2>
              <p className="text-p2 font-medium">
                The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex w-full items-center justify-center bg-white px-4 py-12 lg:w-1/2 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>

            <h2 className="mt-6 text-3xl font-extrabold text-dark-blue">Welcome Back!</h2>
            <p className="mt-5 text-sm text-gray-1">
              Please login to continue where you left off!
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5 rounded-md shadow-sm">
            
              <div>
                <label htmlFor="email-address" className="mb-2 block text-gray-2">
                  Email address*
                </label>
                <input
                  id="email-address"
                  name="primary_email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-md border-2 border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter email address"
                />
              </div>
              <div >
                <label htmlFor="password" className="mb-2 block text-gray-2">
                  Password*
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-md border-2 border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link href="#" className=" text-dark-blue text-[16px] font-semibold">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent btn-linear-gradient py-3 px-4 text-sm font-medium text-white  focus:outline-none border-none"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-3" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-4">OR</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md shadow-xl bg-white py-3 px-4 text-sm font-medium text-black text-[16px]  hover:bg-gray-50 border border-gray-3"
              >
                <Image src="/images/icons/google.png" alt="Google logo" width={24} height={24} className="mr-2" />
                Sign in with Google
              </button>
            </div>
          </div>

          <p className="mt-2 text-center text-sm text-gray-1 font-medium text-[18px]">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-dark-blue">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>




  )
}