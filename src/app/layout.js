import localFont from "next/font/local";
import "./globals.css";
import UserProvider from "@/providers/UserProvider";
import { ToastContainer,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuertProvider from "@/providers/ReactQuertProvider";

export const metadata = {
  title: "Polymaths Ai",
  description: "Polymaths",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <ReactQuertProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </ReactQuertProvider>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition= {Bounce}
          />
      </body>
    </html>
  );
}
